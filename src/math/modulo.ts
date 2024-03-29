import { DivideSignFloatNumber } from "./divide"
import { FloorSignFloatNumber } from "./floor"
import { MultiplySignFloat } from "./multiply"
import { SubSignFloatNumber } from "./subtract"
import {
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"
import { IsNotZero } from "./comparison"

export type ModSignFloatNumber<
  XNumber extends SignFloatNumber,
  YNumber extends SignFloatNumber
> = IsNotZero<YNumber> extends true
  ? DivideSignFloatNumber<
      XNumber,
      YNumber
    > extends infer Divided extends SignFloatNumber
    ? SubSignFloatNumber<
        XNumber,
        MultiplySignFloat<YNumber, FloorSignFloatNumber<Divided>>
      >
    : never
  : never

/**
 * Get the remainder of a division operation
 * @param X The dividend
 * @param Y The divisor
 *
 * ```
 * type Example = Modulo<"3.14", "2">
 * ```
 */
export type Modulo<
  X extends NumberLike,
  Y extends NumberLike
> = ParseSignFloatNumber<X> extends infer XNumber extends SignFloatNumber
  ? ParseSignFloatNumber<Y> extends infer YNumber extends SignFloatNumber
    ? StringifySignFloat<ModSignFloatNumber<XNumber, YNumber>>
    : never
  : never
