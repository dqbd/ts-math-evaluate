import { UnsafeParseNumber } from "../utils/parse"

export type Abs<X extends string> = UnsafeParseNumber<X> extends number
  ? X extends `-${infer V}`
    ? V
    : X
  : never
