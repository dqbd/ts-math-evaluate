import { AddInt } from "./add"
import { CompareDigits } from "./comparison"
import { MultiplySign } from "./mul"
import { SubDigit } from "./sub"
import { PadEndEqually, TrimStart } from "./utils/array"
import {
  Digit,
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "./utils/parse"

interface DivisionResult<
  Quotient extends Digit[] = Digit[],
  Remainder extends Digit[] = Digit[]
> {
  quotient: Quotient
  remainder: Remainder
}

type EuclideanDivision<
  Divident extends Digit[],
  Divisor extends Digit[],
  Tmp extends DivisionResult = DivisionResult<[0], Divident>
> = CompareDigits<Tmp["remainder"], Divisor> extends 1 | 0
  ? EuclideanDivision<
      Divident,
      Divisor,
      DivisionResult<
        AddInt<Tmp["quotient"], [1]>,
        SubDigit<Tmp["remainder"], Divisor>
      >
    >
  : DivisionResult<TrimStart<Tmp["quotient"]>, TrimStart<Tmp["remainder"]>>

export type LongDivisionDigit<
  Divident extends Digit[],
  Divisor extends Digit[],
  Tmp extends DivisionResult = DivisionResult<[], []>
> = Divident extends [
  infer Head extends Digit,
  ...infer RestDivident extends Digit[]
]
  ? EuclideanDivision<
      [...Tmp["remainder"], Head],
      Divisor
    > extends infer IntDivision extends DivisionResult
    ? LongDivisionDigit<
        RestDivident,
        Divisor,
        DivisionResult<
          [...Tmp["quotient"], ...IntDivision["quotient"]],
          IntDivision["remainder"]
        >
      >
    : never
  : DivisionResult<TrimStart<Tmp["quotient"]>, TrimStart<Tmp["remainder"]>>

type LongDivisionFrac<
  Divident extends Digit[],
  Divisor extends Digit[],
  Tmp extends { quotient: Digit[] } = {
    quotient: []
  }
> = Tmp["quotient"]["length"] extends 10
  ? Tmp["quotient"]
  : LongDivisionDigit<
      Divident,
      Divisor
    > extends infer Div extends DivisionResult
  ? Div["remainder"] extends [0]
    ? [...Tmp["quotient"], ...Div["quotient"]]
    : LongDivisionFrac<
        [...Div["remainder"], 0],
        Divisor,
        { quotient: [...Tmp["quotient"], ...Div["quotient"]] }
      >
  : never

type PadFloatForDivide<
  X extends FloatNumber,
  Y extends FloatNumber
> = PadEndEqually<X["frac"], Y["frac"]> extends [
  infer XFrac extends Digit[],
  infer YFrac extends Digit[]
]
  ? [[...X["int"], ...XFrac], [...Y["int"], ...YFrac]]
  : never

export type DivideInt<X extends Digit[], Y extends Digit[]> = LongDivisionDigit<
  X,
  Y
> extends infer IntDivision extends {
  quotient: Digit[]
  remainder: Digit[]
}
  ? FloatNumber<
      IntDivision["quotient"],
      LongDivisionFrac<[...IntDivision["remainder"], 0], Y>
    >
  : never

export type DivideFloatNumber<
  A extends FloatNumber,
  B extends FloatNumber
> = PadFloatForDivide<A, B> extends [
  infer AInt extends Digit[],
  infer BInt extends Digit[]
]
  ? DivideInt<AInt, BInt>
  : never

export type DivideSignFloatNumber<
  A extends SignFloatNumber,
  B extends SignFloatNumber
> = PadFloatForDivide<A["float"], B["float"]> extends [
  infer AInt extends Digit[],
  infer BInt extends Digit[]
]
  ? SignFloatNumber<MultiplySign<A["sign"], B["sign"]>, DivideInt<AInt, BInt>>
  : never

export type Divide<
  X extends NumberLike,
  Y extends NumberLike
> = ParseSignFloatNumber<X> extends infer A extends SignFloatNumber
  ? ParseSignFloatNumber<Y> extends infer B extends SignFloatNumber
    ? StringifySignFloat<DivideSignFloatNumber<A, B>>
    : never
  : never
