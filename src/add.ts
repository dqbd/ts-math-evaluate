import { AddMapCarry } from "./utils/map"
import { PadEndEqually } from "./utils/array"
import {
  NumberLike,
  ParseNumber,
  ParseFloat,
  ExplodeFloatFrac,
  JoinFloatFrac,
  ExpandNumberToArray,
  StringifyFloat,
} from "./utils/parse"

type AddWithCarry<
  A extends number,
  B extends number,
  C extends boolean
> = C extends true
  ? AddMapCarry[A][1] extends [infer R extends number, boolean]
    ? AddWithCarry<R, B, false>
    : never
  : AddMapCarry[A][B]

type AddArr<
  A extends number[],
  B extends number[],
  Tmp extends [number[], boolean] = [[], false]
> = A extends [...infer AR extends number[], infer AF extends number]
  ? B extends [...infer BR extends number[], infer BF extends number]
    ? Tmp extends [
        infer ResultTmp extends number[],
        infer CarryTmp extends boolean
      ]
      ? AddWithCarry<AF, BF, CarryTmp> extends [
          infer Digit extends number,
          infer Carry extends boolean
        ]
        ? AddArr<AR, BR, [[Digit, ...ResultTmp], Carry]>
        : never
      : never
    : never
  : Tmp

type _AddInt<X extends NumberLike, Y extends NumberLike> = [
  ...ExpandNumberToArray<ParseNumber<X>>,
  ...ExpandNumberToArray<ParseNumber<Y>>
]["length"]

type _AddFrac<
  AF extends { int: number; frac: string },
  BF extends { int: number; frac: string }
> = _AddInt<AF["int"], BF["int"]> extends infer IntValue extends number
  ? PadEndEqually<
      ExplodeFloatFrac<AF["frac"]>,
      ExplodeFloatFrac<BF["frac"]>
    > extends infer MatchArray extends [number[], number[]]
    ? AddArr<MatchArray[0], MatchArray[1]> extends [
        infer FracResult extends number[],
        infer Carry extends boolean
      ]
      ? Carry extends true
        ? { int: _AddInt<IntValue, 1>; frac: JoinFloatFrac<FracResult> }
        : Carry extends false
        ? { int: IntValue; frac: JoinFloatFrac<FracResult> }
        : never
      : never
    : never
  : never

export type Add<
  A extends NumberLike,
  B extends NumberLike
> = ParseFloat<A> extends infer AF extends { int: number; frac: string }
  ? ParseFloat<B> extends infer BF extends { int: number; frac: string }
    ? [AF["frac"], BF["frac"]] extends ["", ""]
      ? StringifyFloat<_AddInt<AF["int"], BF["int"]>>
      : StringifyFloat<_AddFrac<AF, BF>>
    : never
  : never
