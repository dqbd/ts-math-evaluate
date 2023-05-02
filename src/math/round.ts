import { AddFloatNumber } from "./add"
import {
  FloatNumber,
  NumberLike,
  Digit,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

type RoundSignFloatNumber<Number extends SignFloatNumber> =
  Number["float"]["frac"] extends [infer Head extends Digit, ...Digit[]]
    ? Head extends 5 | 6 | 7 | 8 | 9
      ? SignFloatNumber<
          Number["sign"],
          AddFloatNumber<
            FloatNumber<Number["float"]["int"], []>,
            FloatNumber<[1], []>
          >
        >
      : SignFloatNumber<Number["sign"], FloatNumber<Number["float"]["int"], []>>
    : Number

/**
 * Round a number to the nearest integer
 * @param T The number to round
 *
 * ```
 * type Example = Round<"3.14">
 * ```
 */
export type Round<T extends NumberLike> =
  ParseSignFloatNumber<T> extends infer Number extends SignFloatNumber
    ? RoundSignFloatNumber<Number> extends infer RoundNumber extends SignFloatNumber
      ? StringifySignFloat<RoundNumber>
      : never
    : never
