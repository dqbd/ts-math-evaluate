import { ParseNumber } from "./utils/parse"

export type Neg<X extends string> = ParseNumber<X> extends number
  ? X extends `-${infer V}`
    ? V
    : `-${X}`
  : never
