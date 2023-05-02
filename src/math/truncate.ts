import {
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

export type TruncateSignFloatNumber<Number extends SignFloatNumber> =
  SignFloatNumber<Number["sign"], FloatNumber<Number["float"]["int"], []>>

/**
 * Truncate a number to the nearest integer
 * @param T The number to truncate
 *
 * ```
 * type Example = Truncate<"3.14">
 * ```
 */
export type Truncate<T extends NumberLike> =
  ParseSignFloatNumber<T> extends infer Number extends SignFloatNumber
    ? StringifySignFloat<TruncateSignFloatNumber<Number>>
    : never
