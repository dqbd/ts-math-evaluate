import { IsEvenInt } from "./comparison"
import { DivideSignFloatNumber, LongDivisionDigit } from "./div"
import { MultiplySignFloat } from "./mul"
import { SubDigit } from "./sub"
import { TrimEnd } from "./utils/array"
import {
  Digit,
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "./utils/parse"

type OneSignFloatNumber = SignFloatNumber<"+", FloatNumber<[1], []>>

type PowInt<X extends SignFloatNumber, N extends Digit[]> = TrimEnd<N> extends [
  0
]
  ? SignFloatNumber<"+", FloatNumber<[1], []>>
  : IsEvenInt<N> extends true
  ? PowInt<MultiplySignFloat<X, X>, LongDivisionDigit<N, [2]>["quotient"]>
  : PowInt<
      MultiplySignFloat<X, X>,
      LongDivisionDigit<SubDigit<N, [1]>, [2]>["quotient"]
    > extends infer OddCase extends SignFloatNumber
  ? MultiplySignFloat<X, OddCase>
  : never

// TODO: handle fractional numbers / convert to never
export type PowSignFloatNumbers<
  X extends SignFloatNumber,
  N extends SignFloatNumber
> = N["sign"] extends "-"
  ? DivideSignFloatNumber<
      OneSignFloatNumber,
      X
    > extends infer Xinv extends SignFloatNumber
    ? PowInt<Xinv, N["float"]["int"]>
    : never
  : PowInt<X, N["float"]["int"]>

export type Pow<
  X extends NumberLike,
  Y extends NumberLike
> = ParseSignFloatNumber<X> extends infer X extends SignFloatNumber
  ? ParseSignFloatNumber<Y> extends infer Y extends SignFloatNumber
    ? PowSignFloatNumbers<X, Y> extends infer Result extends SignFloatNumber
      ? StringifySignFloat<Result>
      : never
    : never
  : never
