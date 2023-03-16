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

type ParseFloatInner<S extends string> = S extends `${infer Int}.${infer Frac}`
  ? And<IsInt<Int>, IsInt<Frac>> extends true
    ? { int: Int; frac: Frac }
    : NaN
  : IsInt<S> extends true
  ? { int: S; frac: "" }
  : NaN

export type ParseFloat<S extends NumberLike> =
  `${S}` extends `${infer Sign extends SignSymbol}${infer Rest}`
    ? ParseFloatInner<Rest> extends { int: infer Int; frac: infer Frac }
      ? { sign: Sign; int: Int; frac: Frac }
      : NaN
    : ParseFloatInner<`${S}`> extends { int: infer Int; frac: infer Frac }
    ? { sign: "+"; int: Int; frac: Frac }
    : NaN

export type UnsafeParseNumber<T extends NumberLike> =
  `${T}` extends `${infer N extends number}` ? N : never

type StringifyWithSign<
  Value extends string,
  T extends { sign?: SignSymbol }
> = T["sign"] extends "-" ? `-${Value}` : Value

export type StringifyFloat<T> = T extends {
  sign?: SignSymbol
  int: string
  frac: string
}
  ? T["frac"] extends ""
    ? StringifyWithSign<`${T["int"]}`, T>
    : StringifyWithSign<`${T["int"]}.${T["frac"]}`, T>
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
