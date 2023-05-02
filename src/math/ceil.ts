import { AddSignFloatNumber } from "./add"
import { CompareSignNumbers } from "./comparison"
import { TruncateSignFloatNumber } from "./truncate"
import {
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

/**
 * Round a number up to the nearest integer
 * @param T The number to ceil
 *
 * ```
 * type Example = Ceil<"3.14">
 * ```
 */
export type Ceil<T extends NumberLike> =
  ParseSignFloatNumber<T> extends infer Number extends SignFloatNumber
    ? TruncateSignFloatNumber<Number> extends infer TrucateNumber extends SignFloatNumber
      ? CompareSignNumbers<Number, TrucateNumber> extends 1
        ? StringifySignFloat<
            AddSignFloatNumber<
              TrucateNumber,
              SignFloatNumber<"+", FloatNumber<[1], []>>
            >
          >
        : StringifySignFloat<TrucateNumber>
      : never
    : never
