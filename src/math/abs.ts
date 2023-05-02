import { NumberLike, UnsafeParseNumber } from "../utils/parse"

/**
 * Absolute value of a number
 * @param T The number to get the absolute value of
 *
 * ```
 * type Example = Abs<"-300">
 * ```
 */
export type Abs<T extends NumberLike> = UnsafeParseNumber<T> extends number
  ? T extends `-${infer V}`
    ? V
    : T
  : never
