import { NumberLike, ParseFloat, StringifyFloat } from "./utils/parse"

export type Truncate<X extends NumberLike> = ParseFloat<X> extends {
  sign: infer Sign
  int: infer Int
}
  ? StringifyFloat<{ sign: Sign; int: Int; frac: "" }>
  : never
