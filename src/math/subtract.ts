import { SubMapCarry } from "../utils/map"
import { PadEndEqually, PadStartEqually } from "../utils/array"
import {
  NumberLike,
  FloatNumber,
  ParseSignFloatNumber,
  SignFloatNumber,
  Digit,
  StringifySignFloat,
} from "../utils/parse"
import { Or } from "../utils/boolean"
import { CompareAbsNumbers } from "./comparison"
import { AddFloatNumber } from "./add"

// TODO: místo LUT expandovat do tuple
// TODO: nelze to sloučit s Add? Co mít LUT / tuple expanzi do jednoho
type _SubWithCarry<
  Left extends number,
  Right extends number,
  Carry extends boolean
> = Carry extends true
  ? SubMapCarry[Left][1] extends [
      infer LeftTmp extends number,
      infer LeftCarry extends boolean
    ]
    ? _SubWithCarry<LeftTmp, Right, false> extends [
        infer Result extends number,
        infer RightCarry extends boolean
      ]
      ? [Result, Or<LeftCarry, RightCarry>]
      : never
    : never
  : SubMapCarry[Left][Right]

// $ExpectType [9, false]
type Carry1 = _SubWithCarry<9, 0, false>

// $ExpectType [1, true]
type Carry2 = _SubWithCarry<0, 9, false>

// $ExpectType [8, false]
type Carry3 = _SubWithCarry<9, 1, false>

// $ExpectType [2, true]
type Carry4 = _SubWithCarry<1, 9, false>

// $ExpectType [8, false]
type Carry5 = _SubWithCarry<9, 0, true>

// $ExpectType [0, true]
type Carry6 = _SubWithCarry<0, 9, true>

// $ExpectType [7, false]
type Carry7 = _SubWithCarry<9, 1, true>

// $ExpectType [1, true]
type Carry8 = _SubWithCarry<1, 9, true>

type SubArr<
  A extends number[],
  B extends number[],
  Tmp extends [number[], boolean] = [[], false]
> = [A, B, Tmp] extends [
  [...infer ARest extends number[], infer ARight extends number],
  [...infer BRest extends number[], infer BRight extends number],
  [infer ResultTmp extends number[], infer CarryTmp extends boolean]
]
  ? _SubWithCarry<ARight, BRight, CarryTmp> extends [
      infer Digit extends number,
      infer Carry extends boolean
    ]
    ? SubArr<ARest, BRest, [[Digit, ...ResultTmp], Carry]>
    : never
  : Tmp

export type SubDigit<A extends Digit[], B extends Digit[]> = PadStartEqually<
  A,
  B
> extends [infer PA extends Digit[], infer PB extends Digit[]]
  ? SubArr<PA, PB> extends [
      infer Rest extends Digit[],
      infer Carry extends boolean
    ]
    ? Carry extends true
      ? never
      : Rest
    : never
  : never

type PadFloat<
  A extends { int: number[]; frac: number[] },
  B extends { int: number[]; frac: number[] }
> = PadStartEqually<A["int"], B["int"]> extends [
  infer IntA extends number[],
  infer IntB extends number[]
]
  ? PadEndEqually<A["frac"], B["frac"]> extends [
      infer FracA extends number[],
      infer FracB extends number[]
    ]
    ? [{ int: IntA; frac: FracA }, { int: IntB; frac: FracB }]
    : never
  : never

// TODO: handle underflow
export type SubFloatNumber<
  A extends FloatNumber,
  B extends FloatNumber
> = PadFloat<A, B> extends [
  FloatNumber<infer IntA, infer FracA>,
  FloatNumber<infer IntB, infer FracB>
]
  ? SubArr<FracA, FracB> extends [
      infer FracResult extends Digit[],
      infer FracCarry extends boolean
    ]
    ? SubArr<IntA, IntB> extends [
        infer IntResult extends Digit[],
        infer IntCarry extends boolean
      ]
      ? IntCarry extends true
        ? FracCarry extends true
          ? SubFloatNumber<
              FloatNumber<IntResult, FracResult>,
              FloatNumber<[1], []>
            >
          : FloatNumber<IntResult, FracResult>
        : FracCarry extends true
        ? SubFloatNumber<
            FloatNumber<IntResult, FracResult>,
            FloatNumber<[1], []>
          >
        : FloatNumber<IntResult, FracResult>
      : never
    : never
  : never

export type SubOperatorSwitch<A extends FloatNumber, B extends FloatNumber> = {
  [-1]: SignFloatNumber<"-", SubFloatNumber<B, A>>
  [1]: SignFloatNumber<"+", SubFloatNumber<A, B>>
  [0]: SignFloatNumber<"+", FloatNumber<[0], []>>
}[CompareAbsNumbers<A, B>]

export type SubSignFloatNumber<
  A extends SignFloatNumber,
  B extends SignFloatNumber
> = {
  "+": {
    "+": SubOperatorSwitch<A["float"], B["float"]>
    "-": SignFloatNumber<"+", AddFloatNumber<A["float"], B["float"]>>
  }
  "-": {
    "+": SignFloatNumber<"-", AddFloatNumber<A["float"], B["float"]>>
    "-": SubOperatorSwitch<B["float"], A["float"]>
  }
}[A["sign"]][B["sign"]]

export type Subtract<A extends NumberLike, B extends NumberLike> = [
  ParseSignFloatNumber<A>,
  ParseSignFloatNumber<B>
] extends [infer X extends SignFloatNumber, infer Y extends SignFloatNumber]
  ? StringifySignFloat<SubSignFloatNumber<X, Y>>
  : never
