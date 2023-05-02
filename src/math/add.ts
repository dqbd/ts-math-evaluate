import { AddMapCarry } from "../utils/map"
import {
  NumberLike,
  ParseSignFloatNumber,
  PadFloat,
  FloatNumber,
  SignFloatNumber,
  Digit,
  StringifySignFloat,
} from "../utils/parse"
import { Or } from "../utils/boolean"
import { SubOperatorSwitch } from "./subtract"
import { PadStartEqually } from "../utils/array"

type AddWithCarry<
  Left extends number,
  Right extends number,
  Carry extends boolean
> = Carry extends true
  ? AddMapCarry[Left][1] extends [
      infer LeftTmp extends number,
      infer LeftCarry extends boolean
    ]
    ? AddWithCarry<LeftTmp, Right, false> extends [
        infer Result extends number,
        infer RightCarry extends boolean
      ]
      ? [Result, Or<LeftCarry, RightCarry>]
      : never
    : never
  : AddMapCarry[Left][Right]

type AddArr<
  A extends number[],
  B extends number[],
  Tmp extends [number[], boolean] = [[], false]
> = [A, B, Tmp] extends [
  [...infer ARest extends number[], infer ARight extends number],
  [...infer BRest extends number[], infer BRight extends number],
  [infer Result extends number[], infer Carry extends boolean]
]
  ? AddWithCarry<ARight, BRight, Carry> extends [
      infer Digit extends number,
      infer Carry extends boolean
    ]
    ? AddArr<ARest, BRest, [[Digit, ...Result], Carry]>
    : never
  : Tmp

export type AddInt<A extends Digit[], B extends Digit[]> = PadStartEqually<
  A,
  B
> extends [infer PA extends Digit[], infer PB extends Digit[]]
  ? AddArr<PA, PB> extends [
      infer Rest extends Digit[],
      infer Carry extends boolean
    ]
    ? Carry extends true
      ? [1, ...Rest]
      : Rest
    : never
  : never

export type AddFloatNumber<
  A extends FloatNumber,
  B extends FloatNumber
> = PadFloat<A, B> extends [
  FloatNumber<infer IntA, infer FracA>,
  FloatNumber<infer IntB, infer FracB>
]
  ? AddArr<FracA, FracB> extends [
      infer FracResult extends Digit[],
      infer FracCarry extends boolean
    ]
    ? AddArr<IntA, IntB> extends [
        infer IntResult extends Digit[],
        infer IntCarry extends boolean
      ]
      ? IntCarry extends true
        ? FracCarry extends true
          ? AddFloatNumber<
              FloatNumber<[1, ...IntResult], FracResult>,
              FloatNumber<[1], []>
            >
          : FloatNumber<[1, ...IntResult], FracResult>
        : FracCarry extends true
        ? AddFloatNumber<
            FloatNumber<IntResult, FracResult>,
            FloatNumber<[1], []>
          >
        : FloatNumber<IntResult, FracResult>
      : never
    : never
  : never

export type AddSignFloatNumber<
  A extends SignFloatNumber,
  B extends SignFloatNumber
> = {
  "+": {
    "+": SignFloatNumber<"+", AddFloatNumber<A["float"], B["float"]>>
    "-": SubOperatorSwitch<A["float"], B["float"]>
  }
  "-": {
    "+": SubOperatorSwitch<B["float"], A["float"]>
    "-": SignFloatNumber<"-", AddFloatNumber<A["float"], B["float"]>>
  }
}[A["sign"]][B["sign"]]

export type Add<Left extends NumberLike, Right extends NumberLike> = [
  ParseSignFloatNumber<Left>,
  ParseSignFloatNumber<Right>
] extends [infer X extends SignFloatNumber, infer Y extends SignFloatNumber]
  ? StringifySignFloat<AddSignFloatNumber<X, Y>>
  : never
