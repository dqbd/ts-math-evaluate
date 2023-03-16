import { AddMapCarry } from "./utils/map"
import {
  NumberLike,
  ParseSignFloatNumber,
  ExpandNumberToArray,
  PadFloat,
  FloatNumber,
  SignFloatNumber,
  Digit,
  StringifySignFloat,
} from "./utils/parse"
import { Or } from "./utils/boolean"
import { SubOperatorSwitch } from "./sub"

type AsNumber<S extends string> = S extends `${infer N extends number}`
  ? N
  : never

type SubWithCarryTuple<
  Left extends number,
  Right extends number,
  Carry extends boolean
> = ExpandNumberToArray<Left> extends [
  ...infer U extends number[],
  ...ExpandNumberToArray<Right>,
  ...ExpandNumberToArray<Carry extends true ? 1 : 0>
]
  ? U
  : never

// $ExpectType 0
type X0 = SubWithCarryTuple<1, 1, false>["length"]

type AddWithCarryTuple<
  Left extends number,
  Right extends number,
  Carry extends boolean
> = [
  ...ExpandNumberToArray<Left>,
  ...ExpandNumberToArray<Right>,
  ...ExpandNumberToArray<Carry extends true ? 1 : 0>
]["length"] extends infer S extends number
  ? `${S}` extends `${infer Head}${infer Tail}`
    ? Tail extends ""
      ? [AsNumber<Head>, false]
      : [AsNumber<Tail>, true]
    : never
  : never

// $ExpectType [0, true]
type X1 = AddWithCarryTuple<9, 1, false>

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

type AddSignFloatNumber<
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
