import { CompareSignNumbers } from "./comparison"
import { SubSignFloatNumber } from "./subtract"
import { TruncateSignFloatNumber } from "./truncate"
import {
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

export type FloorSignFloatNumber<Number extends SignFloatNumber> =
  TruncateSignFloatNumber<Number> extends infer TrucateNumber extends SignFloatNumber
    ? CompareSignNumbers<Number, TrucateNumber> extends -1
      ? SubSignFloatNumber<
          TrucateNumber,
          SignFloatNumber<"+", FloatNumber<[1], []>>
        >
      : TrucateNumber
    : never

/**
 * Round a number down to the nearest integer
 * @param T The number to floor
 *
 * ```
 * type Example = Floor<"3.14">
 * ```
 */
export type Floor<T extends NumberLike> =
  ParseSignFloatNumber<T> extends infer Number extends SignFloatNumber
    ? StringifySignFloat<FloorSignFloatNumber<Number>>
    : never
