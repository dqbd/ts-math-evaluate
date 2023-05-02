import { IsEvenInt } from "./comparison"
import { DivideSignFloatNumber, LongDivisionDigit } from "./divide"
import { MultiplySignFloat } from "./multiply"
import { SubDigit } from "./subtract"
import { TrimEnd, TrimEndAll } from "../utils/array"
import {
  Digit,
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

type OneSignFloatNumber = SignFloatNumber<"+", FloatNumber<[1], []>>

type PowerAuxInt<
  X extends SignFloatNumber,
  N extends Digit[],
  Y extends SignFloatNumber = SignFloatNumber<"+", FloatNumber<[1], []>>
> = TrimEnd<N> extends [0]
  ? Y
  : IsEvenInt<N> extends true
  ? PowerAuxInt<
      MultiplySignFloat<X, X>,
      LongDivisionDigit<N, [2]>["quotient"],
      Y
    >
  : PowerAuxInt<
      MultiplySignFloat<X, X>,
      LongDivisionDigit<SubDigit<N, [1]>, [2]>["quotient"],
      MultiplySignFloat<X, Y>
    >

export type PowerSignFloatNumbers<
  X extends SignFloatNumber,
  N extends SignFloatNumber
> = TrimEndAll<N["float"]["frac"]> extends []
  ? N["sign"] extends "-"
    ? DivideSignFloatNumber<
        OneSignFloatNumber,
        X
      > extends infer Xinv extends SignFloatNumber
      ? PowerAuxInt<Xinv, N["float"]["int"]>
      : never
    : PowerAuxInt<X, N["float"]["int"]>
  : never

/**
 * Calculate the power of a number
 * @param X The base number
 * @param Y The exponent
 * 
 * ```
 * type Example = Power<"2", "3">
 * ```
 */
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
