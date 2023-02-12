import { ExpandArrayByTen, PadStart } from "./array"

export type NumberLike = string | number

export type ParseNumber<T extends NumberLike> =
  `${T}` extends `${infer N extends number}` ? N : never

export type ParseFloat<T extends NumberLike> =
  `${T}` extends `${infer Int extends number}.${infer Frac extends string}`
    ? { int: Int; frac: Frac }
    : `${T}` extends `${infer Int extends number}`
    ? { int: Int; frac: "" }
    : never

export type StringifyFloat<T> = T extends { int: number; frac: string }
  ? T["frac"] extends ""
    ? `${T["int"]}`
    : `${T["int"]}.${T["frac"]}`
  : T extends string | number
  ? `${T}` extends `${infer N extends number}`
    ? `${N}`
    : never
  : never

export type ExplodeFloatFrac<T extends string> =
  T extends `${infer Digit extends number}${infer Rest}`
    ? [Digit, ...ExplodeFloatFrac<Rest>]
    : []

export type JoinFloatFrac<T extends number[]> = T extends [
  infer A extends number,
  ...infer R extends number[]
]
  ? `${A}${JoinFloatFrac<R>}`
  : ""

export type ExpandNumberToArray<
  T extends NumberLike,
  Rest extends Array<any> = []
> = `${T}` extends `${infer L extends number}${infer R}`
  ? ExpandNumberToArray<R, [...ExpandArrayByTen<Rest>, ...PadStart<L>]>
  : Rest