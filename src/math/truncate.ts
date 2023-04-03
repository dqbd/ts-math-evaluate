import {
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

export type TruncateSignFloatNumber<Number extends SignFloatNumber> =
  SignFloatNumber<Number["sign"], FloatNumber<Number["float"]["int"], []>>

export type Truncate<Value extends NumberLike> =
  ParseSignFloatNumber<Value> extends infer Number extends SignFloatNumber
    ? StringifySignFloat<TruncateSignFloatNumber<Number>>
    : never
