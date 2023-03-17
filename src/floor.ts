import { CompareSignNumbers } from "./comparison"
import { SubSignFloatNumber } from "./sub"
import { TruncateSignFloatNumber } from "./truncate"
import {
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "./utils/parse"

export type FloorSignFloatNumber<Number extends SignFloatNumber> =
  TruncateSignFloatNumber<Number> extends infer TrucateNumber extends SignFloatNumber
    ? CompareSignNumbers<Number, TrucateNumber> extends -1
      ? SubSignFloatNumber<
          TrucateNumber,
          SignFloatNumber<"+", FloatNumber<[1], []>>
        >
      : TrucateNumber
    : never

export type Floor<Value extends NumberLike> =
  ParseSignFloatNumber<Value> extends infer Number extends SignFloatNumber
    ? StringifySignFloat<FloorSignFloatNumber<Number>>
    : never
