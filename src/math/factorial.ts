import { MultiplyInt } from "./mul"
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

export type Factorial<X extends NumberLike> =
  ParseSignFloatNumber<X> extends infer Number extends SignFloatNumber
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
