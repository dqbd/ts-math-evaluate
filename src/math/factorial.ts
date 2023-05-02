import { MultiplyInt } from "./multiply"
import { SubDigit } from "./subtract"
import { TrimStart } from "../utils/array"
import {
  Digit,
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

type FactorialInt<
  X extends Digit[],
  Memory extends Digit[] = [1]
> = TrimStart<X> extends infer Trimmed extends Digit[]
  ? X extends [0]
    ? [1]
    : X extends [1]
    ? Memory
    : FactorialInt<SubDigit<Trimmed, [1]>, MultiplyInt<Memory, Trimmed>>
  : never

/**
 * Calculate the factorial of a number
 * @param T The number to calculate the factorial of
 * 
 * ```
 * type Example = Factorial<"5">
 * ```
 */
export type Factorial<T extends NumberLike> =
  ParseSignFloatNumber<T> extends infer Number extends SignFloatNumber
    ? Number["sign"] extends "+"
      ? Number["float"]["frac"]["length"] extends 0
        ? StringifySignFloat<
            SignFloatNumber<
              "+",
              FloatNumber<FactorialInt<Number["float"]["int"]>, []>
            >
          >
        : never
      : never
    : never
