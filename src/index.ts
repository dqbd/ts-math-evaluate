type ParseNumber<T extends string | number> =
  T extends `${infer N extends number}` ? N : never

type ParseFloat<T extends string | number> =
  `${T}` extends `${infer Int extends number}.${infer Frac extends string}`
    ? { int: Int; frac: Frac }
    : never

type Z = ParseFloat<"3.123">
type ExpandByOne<
  V extends number,
  List extends Array<any> = []
> = List["length"] extends V ? List : ExpandByOne<V, [0, ...List]>

type C = Z["frac"]

type ExpandByTen<R extends Array<0>> = [
  ...R,
  ...R,
  ...R,
  ...R,
  ...R,
  ...R,
  ...R,
  ...R,
  ...R,
  ...R
]

type ExpandToArray<
  T extends string | number,
  Rest extends Array<any> = []
> = `${T}` extends `${infer L extends number}${infer R}`
  ? ExpandToArray<R, [...ExpandByTen<Rest>, ...ExpandByOne<L>]>
  : Rest

type _Add<X extends string, Y extends string> = [
  ...ExpandToArray<ParseNumber<X>>,
  ...ExpandToArray<ParseNumber<Y>>
]["length"]

export type Add<X extends string, Y extends string> = _Add<X, Y> extends number
  ? `${_Add<X, Y>}`
  : never

export type Abs<X extends string> = ParseNumber<X> extends number
  ? X extends `-${infer V}`
    ? V
    : X
  : never

export type Neg<X extends string> = ParseNumber<X> extends number
  ? X extends `-${infer V}`
    ? V
    : `-${X}`
  : never
