import { AddFloatNumber } from "./add"
import {
  FloatNumber,
  NumberLike,
  Digit,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "./utils/parse"

export type Round<Value extends NumberLike> =
  ParseSignFloatNumber<Value> extends infer Number extends SignFloatNumber
    ? Number["float"]["frac"] extends [infer Head extends Digit, ...Digit[]]
      ? Head extends 5 | 6 | 7 | 8 | 9
        ? StringifySignFloat<
            SignFloatNumber<
              Number["sign"],
              AddFloatNumber<
                FloatNumber<Number["float"]["int"], []>,
                FloatNumber<[1], []>
              >
            >
          >
        : StringifySignFloat<
            SignFloatNumber<
              Number["sign"],
              FloatNumber<Number["float"]["int"], []>
            >
          >
      : Value
    : never


