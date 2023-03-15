import { AddMapCarry } from "./utils/map"
import { PadEndEqually, PadStartEqually } from "./utils/array"
import {
  NumberLike,
  ParseFloat,
  ExplodeDigit,
  JoinDigit,
  StringifyFloat,
} from "./utils/parse"
import { Or } from "./utils/boolean"

// TODO: místo LUT expandovat do tuple
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

// $ExpectType [9, false]
type Carry1 = AddWithCarry<9, 0, false>

// $ExpectType [9, false]
type Carry2 = AddWithCarry<0, 9, false>

// $ExpectType [0, true]
type Carry3 = AddWithCarry<9, 1, false>

// $ExpectType [0, true]
type Carry4 = AddWithCarry<1, 9, false>

// $ExpectType [0, true]
type Carry5 = AddWithCarry<9, 0, true>

// $ExpectType [0, true]
type Carry6 = AddWithCarry<0, 9, true>

// $ExpectType [1, true]
type Carry7 = AddWithCarry<9, 1, true>

// $ExpectType [1, true]
type Carry8 = AddWithCarry<1, 9, true>

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

// $ExpectType [[0], true]
type AddArrCase1 = AddArr<[9], [1]>

// $ExpectType [[0, 0, 0], true]
type AddArrCase2 = AddArr<[9, 9, 9], [0, 0, 1]>

// $ExpectType [[9, 9], false]
type AddArrCase3 = AddArr<[9, 0], [0, 9]>

// $ExpectType [[0, 1, 1], true]
type AddArrCase4 = AddArr<[0, 1, 2], [9, 9, 9]>

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

type _AddInner<
  A extends { int: number[]; frac: number[] },
  B extends { int: number[]; frac: number[] }
> = PadFloat<A, B> extends [
  { int: infer IntA extends number[]; frac: infer FracA extends number[] },
  { int: infer IntB extends number[]; frac: infer FracB extends number[] }
]
  ? AddArr<FracA, FracB> extends [
      infer FracResult extends number[],
      infer FracCarry extends boolean
    ]
    ? AddArr<IntA, IntB> extends [
        infer IntResult extends number[],
        infer IntCarry extends boolean
      ]
      ? IntCarry extends true
        ? FracCarry extends true
          ? _AddInner<
              { int: [1, ...IntResult]; frac: FracResult },
              { int: [1]; frac: [] }
            >
          : { int: [1, ...IntResult]; frac: FracResult }
        : FracCarry extends true
        ? _AddInner<
            { int: IntResult; frac: FracResult },
            { int: [1]; frac: [] }
          >
        : { int: IntResult; frac: FracResult }
      : never
    : never
  : never

export type Add<A extends NumberLike, B extends NumberLike> = [
  ParseFloat<A>,
  ParseFloat<B>
] extends [
  infer SrcA extends { int: string; frac: string },
  infer SrcB extends { int: string; frac: string }
]
  ? _AddInner<
      { int: ExplodeDigit<SrcA["int"]>; frac: ExplodeDigit<SrcA["frac"]> },
      { int: ExplodeDigit<SrcB["int"]>; frac: ExplodeDigit<SrcB["frac"]> }
    > extends infer Result extends { int: number[]; frac: number[] }
    ? StringifyFloat<{
        int: JoinDigit<Result["int"]>
        frac: JoinDigit<Result["frac"]>
      }>
    : never
  : never
