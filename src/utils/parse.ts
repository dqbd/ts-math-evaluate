import {
  ExpandArrayByTen,
  PadEndEqually,
  PadStart,
  PadStartEqually,
} from "./array"

export type NumberLike = string | number

export type NaN = "NaN"
export type Sign = "+" | "-"
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type FloatNumber<
  IntDigits extends Digit[] = Digit[],
  FracDigits extends Digit[] = Digit[]
> = {
  int: IntDigits
  frac: FracDigits
}

export type SignFloatNumber<
  Sign extends "+" | "-" = "+" | "-",
  Float extends FloatNumber<Digit[], Digit[]> = FloatNumber
> = {
  sign: Sign
  float: Float
}

export type ParseNumber<S extends string> =
  S extends `${infer Int extends Digit}${infer Rest}`
    ? [Int, ...ParseNumber<Rest>]
    : []

export type ParseFloatNumber<S extends NumberLike> =
  `${S}` extends `${infer Int}.${infer Frac}`
    ? FloatNumber<ParseNumber<Int>, ParseNumber<Frac>>
    : FloatNumber<ParseNumber<`${S}`>, []>

export type ParseSignFloatNumber<S extends NumberLike> =
  `${S}` extends `${infer VSign extends Sign}${infer Rest}`
    ? SignFloatNumber<VSign, ParseFloatNumber<Rest>>
    : SignFloatNumber<"+", ParseFloatNumber<`${S}`>>

export type UnsafeParseNumber<T extends NumberLike> =
  `${T}` extends `${infer N extends number}` ? N : never

export type JoinDigit<T extends number[]> = T extends [
  infer A extends number,
  ...infer R extends number[]
]
  ? `${A}${JoinDigit<R>}`
  : ""

export type StringifyFloat<T> = T extends infer Number extends FloatNumber
  ? Number["frac"]["length"] extends 0
    ? `${JoinDigit<Number["int"]>}`
    : `${JoinDigit<Number["int"]>}.${JoinDigit<Number["frac"]>}`
  : never

export type StringifySignFloat<T> =
  T extends infer Number extends SignFloatNumber
    ? Number["sign"] extends "-"
      ? `-${StringifyFloat<Number["float"]>}`
      : StringifyFloat<Number["float"]>
    : never

export type ExpandNumberToArray<
  T extends NumberLike,
  Rest extends Array<any> = []
> = `${T}` extends `${infer L extends number}${infer R}`
  ? ExpandNumberToArray<R, [...ExpandArrayByTen<Rest>, ...PadStart<L>]>
  : Rest

export type PadFloat<
  A extends { int: number[]; frac: number[] },
  B extends { int: number[]; frac: number[] }
> = PadStartEqually<A["int"], B["int"]> extends [
  infer IntA extends number[],
  infer IntB extends number[]
]
  ? PadEndEqually<A["frac"], B["frac"]> extends [
      infer FracA extends number[],
      infer FracB extends number[]
    ]
    ? [{ int: IntA; frac: FracA }, { int: IntB; frac: FracB }]
    : never
  : never
