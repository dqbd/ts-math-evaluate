import { SubMapCarry } from "./utils/map"
import { PadEndEqually, PadStartEqually } from "./utils/array"
import {
  NumberLike,
  ExplodeDigit,
  JoinDigit,
  ParseFloat,
  StringifyFloat,
} from "./utils/parse"
import { Or } from "./utils/boolean"

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
type _SubInner<
  A extends { int: number[]; frac: number[] },
  B extends { int: number[]; frac: number[] }
> = PadFloat<A, B> extends [
  { int: infer IntA extends number[]; frac: infer FracA extends number[] },
  { int: infer IntB extends number[]; frac: infer FracB extends number[] }
]
  ? SubArr<FracA, FracB> extends [
      infer FracResult extends number[],
      infer FracCarry extends boolean
    ]
    ? SubArr<IntA, IntB> extends [
        infer IntResult extends number[],
        infer IntCarry extends boolean
      ]
      ? IntCarry extends true
        ? FracCarry extends true
          ? _SubInner<
              { int: IntResult; frac: FracResult },
              { int: [1]; frac: [] }
            >
          : { int: IntResult; frac: FracResult }
        : FracCarry extends true
        ? _SubInner<
            { int: IntResult; frac: FracResult },
            { int: [1]; frac: [] }
          >
        : { int: IntResult; frac: FracResult }
      : never
    : never
  : never

export type Sub<A extends NumberLike, B extends NumberLike> = [
  ParseFloat<A>,
  ParseFloat<B>
] extends [
  infer SrcA extends { int: string; frac: string },
  infer SrcB extends { int: string; frac: string }
]
  ? _SubInner<
      { int: ExplodeDigit<SrcA["int"]>; frac: ExplodeDigit<SrcA["frac"]> },
      { int: ExplodeDigit<SrcB["int"]>; frac: ExplodeDigit<SrcB["frac"]> }
    > extends infer Result extends { int: number[]; frac: number[] }
    ? StringifyFloat<{
        int: JoinDigit<Result["int"]>
        frac: JoinDigit<Result["frac"]>
      }>
    : never
  : never
