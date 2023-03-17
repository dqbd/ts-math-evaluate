import { AddInt } from "./add"
import { AddMapCarry, MulMapCarry } from "./utils/map"
import {
  Digit,
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "./utils/parse"

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

// TODO: handle floating point numbers
export type MultiplySignFloat<
  X extends SignFloatNumber,
  Y extends SignFloatNumber
> = SignFloatNumber<
  MultiplySign<X["sign"], Y["sign"]>,
  FloatNumber<MultiplyInt<X["float"]["int"], Y["float"]["int"]>, []>
>

export type Multiply<X extends NumberLike, Y extends NumberLike> = [
  ParseSignFloatNumber<X>,
  ParseSignFloatNumber<Y>
] extends [infer X extends SignFloatNumber, infer Y extends SignFloatNumber]
  ? StringifySignFloat<MultiplySignFloat<X, Y>>
  : never
