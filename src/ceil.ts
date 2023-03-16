import { AddSignFloatNumber } from "./add"
import { CompareSignNumbers } from "./comparison"
import { TruncateSignFloatNumber } from "./truncate"
import {
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "./utils/parse"

export type Ceil<Value extends NumberLike> =
  ParseSignFloatNumber<Value> extends infer Number extends SignFloatNumber
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


