import { SubMapCarry } from "./utils/map"
import { PadEndEqually } from "./utils/array"
import {
  NumberLike,
  ExplodeFloatFrac,
  JoinFloatFrac,
  ParseFloat,
  StringifyFloat,
  ExpandNumberToArray,
} from "./utils/parse"

type _SubWithCarry<
  A extends number,
  B extends number,
  C extends boolean
> = C extends true
  ? SubMapCarry[A][1] extends [infer R extends number, boolean]
    ? _SubWithCarry<R, B, false>
    : never
  : SubMapCarry[A][B]
type _SubFracArray<
  A extends number[],
  B extends number[],
  Tmp extends [number[], boolean] = [[], false]
> = A extends [...infer AR extends number[], infer AF extends number]
  ? B extends [...infer BR extends number[], infer BF extends number]
    ? Tmp extends [
        infer ResultTmp extends number[],
        infer CarryTmp extends boolean
      ]
      ? _SubWithCarry<AF, BF, CarryTmp> extends [
          infer Digit extends number,
          infer Carry extends boolean
        ]
        ? _SubFracArray<AR, BR, [[Digit, ...ResultTmp], Carry]>
        : never
      : never
    : never
  : Tmp

type _SubInt<
  X extends NumberLike,
  Y extends NumberLike
> = ExpandNumberToArray<X> extends [
  ...infer Result extends number[],
  ...ExpandNumberToArray<Y>
]
  ? Result["length"]
  : never

type _SubFrac<
  AF extends { int: number; frac: string },
  BF extends { int: number; frac: string }
> = _SubInt<AF["int"], BF["int"]> extends infer IntValue extends number
  ? PadEndEqually<
      ExplodeFloatFrac<AF["frac"]>,
      ExplodeFloatFrac<BF["frac"]>
    > extends infer MatchArray extends [number[], number[]]
    ? _SubFracArray<MatchArray[0], MatchArray[1]> extends [
        infer FracResult extends number[],
        infer Carry extends boolean
      ]
      ? Carry extends true
        ? { int: _SubInt<IntValue, 1>; frac: JoinFloatFrac<FracResult> }
        : Carry extends false
        ? { int: IntValue; frac: JoinFloatFrac<FracResult> }
        : never
      : never
    : never
  : never

export type Sub<
  A extends NumberLike,
  B extends NumberLike
> = ParseFloat<A> extends infer AF extends { int: number; frac: string }
  ? ParseFloat<B> extends infer BF extends { int: number; frac: string }
    ? [AF["frac"], BF["frac"]] extends ["", ""]
      ? StringifyFloat<_SubInt<AF["int"], BF["int"]>>
      : StringifyFloat<_SubFrac<AF, BF>>
    : never
  : never
