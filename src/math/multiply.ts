import { AddInt } from "./add"
import { AddMapCarry, MulMapCarry } from "../utils/map"
import {
  Digit,
  ExpandNumberToArray,
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

type NextMultiplyCarry<
  NextMulCarry extends Digit,
  AddCarry extends boolean
> = AddCarry extends true ? AddMapCarry[NextMulCarry][1][0] : NextMulCarry

type MultiplySingleInt<
  X extends Digit[],
  Single extends Digit,
  Tmp extends { result: Digit[]; carry: Digit } = { result: []; carry: 0 }
> = X extends [...infer Rest extends Digit[], infer Tail extends Digit]
  ? MulMapCarry[Tail][Single] extends [
      infer MulResult extends Digit,
      infer NextMulCarry extends Digit
    ]
    ? AddMapCarry[Tmp["carry"]][MulResult] extends [
        infer Result extends Digit,
        infer AddCarry extends boolean
      ]
      ? MultiplySingleInt<
          Rest,
          Single,
          {
            result: [Result, ...Tmp["result"]]
            carry: NextMultiplyCarry<NextMulCarry, AddCarry>
          }
        >
      : never
    : never
  : Tmp["carry"] extends 0
  ? Tmp["result"]
  : [Tmp["carry"], ...Tmp["result"]]

export type MultiplySign<A extends "+" | "-", B extends "+" | "-"> = {
  "+": {
    "+": "+"
    "-": "-"
  }
  "-": {
    "+": "-"
    "-": "+"
  }
}[A][B]

export type MultiplyInt<
  X extends Digit[],
  Y extends Digit[],
  Tmp extends { result: Digit[]; offset: Digit[] } = { result: [0]; offset: [] }
> = Y extends [...infer Rest extends Digit[], infer Single extends Digit]
  ? MultiplySingleInt<X, Single> extends infer SingleResult extends Digit[]
    ? AddInt<
        Tmp["result"],
        [...SingleResult, ...Tmp["offset"]]
      > extends infer Result extends Digit[]
      ? MultiplyInt<X, Rest, { result: Result; offset: [0, ...Tmp["offset"]] }>
      : never
    : never
  : Tmp["result"]

type IntFloat<
  Mantissa extends Digit[] = Digit[],
  DecimalPlaces extends Array<0> = Array<0>
> = {
  mantissa: Mantissa
  precision: DecimalPlaces
}

type ExpandIntFloat<X extends FloatNumber> = IntFloat<
  [...X["int"], ...X["frac"]],
  ExpandNumberToArray<X["frac"]["length"]>
>

type Compress<
  Count extends Array<0>,
  Left extends Digit[],
  Right extends Digit[] = []
> = Count extends [0, ...infer RestCount extends 0[]]
  ? Left extends [...infer LeftRest extends Digit[], infer End extends Digit]
    ? Compress<RestCount, LeftRest, [End, ...Right]>
    : Compress<RestCount, Left, [0, ...Right]>
  : [Left, Right]

type CompressIntFloat<X extends IntFloat> = Compress<
  X["precision"],
  X["mantissa"]
> extends [infer Int extends Digit[], infer Frac extends Digit[]]
  ? FloatNumber<Int, Frac>
  : never

type MultiplyFloat<
  X extends FloatNumber,
  Y extends FloatNumber
> = ExpandIntFloat<X> extends infer A extends IntFloat
  ? ExpandIntFloat<Y> extends infer B extends IntFloat
    ? CompressIntFloat<
        IntFloat<
          MultiplyInt<A["mantissa"], B["mantissa"]>,
          [...A["precision"], ...B["precision"]]
        >
      >
    : never
  : never

export type MultiplySignFloat<
  X extends SignFloatNumber,
  Y extends SignFloatNumber
> = SignFloatNumber<
  MultiplySign<X["sign"], Y["sign"]>,
  MultiplyFloat<X["float"], Y["float"]>
>

export type Multiply<X extends NumberLike, Y extends NumberLike> = [
  ParseSignFloatNumber<X>,
  ParseSignFloatNumber<Y>
] extends [infer X extends SignFloatNumber, infer Y extends SignFloatNumber]
  ? StringifySignFloat<MultiplySignFloat<X, Y>>
  : never
