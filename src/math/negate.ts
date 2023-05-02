import { NumberLike, UnsafeParseNumber } from "../utils/parse"

/**
 * Negate a number
 * @param T The number to negate
 *
 * ```
 * type Example = Negate<"-300">
 * ```
 */
export type Negate<T extends NumberLike> = UnsafeParseNumber<T> extends number
  ? T extends `-${infer V}`
    ? V
    : `-${T}`
  : never
