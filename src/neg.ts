import { NumberLike, ParseNumber } from "./utils/parse"

export type Neg<X extends NumberLike> = ParseNumber<X> extends number
  ? X extends `-${infer V}`
    ? V
    : `-${X}`
  : never
