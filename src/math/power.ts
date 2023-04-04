import { IsEvenInt } from "./comparison"
import { DivideSignFloatNumber, LongDivisionDigit } from "./divide"
import { MultiplySignFloat } from "./mul"
import { SubDigit } from "./subtract"
import { TrimEnd } from "../utils/array"
import {
  Digit,
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

type OneSignFloatNumber = SignFloatNumber<"+", FloatNumber<[1], []>>

type PowerInt<
  X extends SignFloatNumber,
  N extends Digit[]
> = TrimEnd<N> extends [0]
  ? SignFloatNumber<"+", FloatNumber<[1], []>>
  : IsEvenInt<N> extends true
  ? PowerInt<MultiplySignFloat<X, X>, LongDivisionDigit<N, [2]>["quotient"]>
  : PowerInt<
      MultiplySignFloat<X, X>,
      LongDivisionDigit<SubDigit<N, [1]>, [2]>["quotient"]
    > extends infer OddCase extends SignFloatNumber
  ? MultiplySignFloat<X, OddCase>
  : never

// TODO: handle fractional numbers / convert to never
export type PowerSignFloatNumbers<
  X extends SignFloatNumber,
  N extends SignFloatNumber
> = N["sign"] extends "-"
  ? DivideSignFloatNumber<
      OneSignFloatNumber,
      X
    > extends infer Xinv extends SignFloatNumber
    ? PowerInt<Xinv, N["float"]["int"]>
    : never
  : PowerInt<X, N["float"]["int"]>

export type Power<
  X extends NumberLike,
  Y extends NumberLike
> = ParseSignFloatNumber<X> extends infer X extends SignFloatNumber
  ? ParseSignFloatNumber<Y> extends infer Y extends SignFloatNumber
    ? PowerSignFloatNumbers<X, Y> extends infer Result extends SignFloatNumber
      ? StringifySignFloat<Result>
      : never
    : never
  : never
