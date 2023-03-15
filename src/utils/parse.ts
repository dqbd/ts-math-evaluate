import { ExpandArrayByTen, PadStart } from "./array"
import { And } from "./boolean"

export type NumberLike = string | number

type SignSymbol = "+" | "-"
type NaN = "NaN"

type IsInt<S extends string> = S extends `${number}${infer Rest}`
  ? Rest extends ""
    ? true
    : IsInt<Rest>
  : false

type _ParseFloat<S extends string> = S extends `${infer Int}.${infer Frac}`
  ? And<IsInt<Int>, IsInt<Frac>> extends true
    ? { int: Int; frac: Frac }
    : NaN
  : IsInt<S> extends true
  ? { int: S; frac: "" }
  : NaN

export type ParseFloat<S extends NumberLike> =
  `${S}` extends `${infer Sign extends SignSymbol}${infer Rest}`
    ? _ParseFloat<Rest> extends { int: infer Int; frac: infer Frac }
      ? { sign: Sign; int: Int; frac: Frac }
      : NaN
    : _ParseFloat<`${S}`> extends { int: infer Int; frac: infer Frac }
    ? { sign: "+"; int: Int; frac: Frac }
    : NaN

export type UnsafeParseNumber<T extends NumberLike> =
  `${T}` extends `${infer N extends number}` ? N : never

export type StringifyFloat<T> = T extends { int: string; frac: string }
  ? T["frac"] extends ""
    ? `${T["int"]}`
    : `${T["int"]}.${T["frac"]}`
  : T extends string | number
  ? `${T}` extends `${infer N extends number}`
    ? `${N}`
    : never
  : never

export type ExplodeDigit<T extends string> =
  T extends `${infer Digit extends number}${infer Rest}`
    ? [Digit, ...ExplodeDigit<Rest>]
    : []

export type JoinDigit<T extends number[]> = T extends [
  infer A extends number,
  ...infer R extends number[]
]
  ? `${A}${JoinDigit<R>}`
  : ""

export type ExpandNumberToArray<
  T extends NumberLike,
  Rest extends Array<any> = []
> = `${T}` extends `${infer L extends number}${infer R}`
  ? ExpandNumberToArray<R, [...ExpandArrayByTen<Rest>, ...PadStart<L>]>
  : Rest
