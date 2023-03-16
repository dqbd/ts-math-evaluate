import {
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "./utils/parse"

export type Truncate<Value extends NumberLike> =
  ParseSignFloatNumber<Value> extends infer Number extends SignFloatNumber
    ? StringifySignFloat<
        SignFloatNumber<Number["sign"], FloatNumber<Number["float"]["int"], []>>
      >
    : never
