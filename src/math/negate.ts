import { NumberLike, UnsafeParseNumber } from "../utils/parse"

export type Negate<X extends NumberLike> = UnsafeParseNumber<X> extends number
  ? X extends `-${infer V}`
    ? V
    : `-${X}`
  : never
