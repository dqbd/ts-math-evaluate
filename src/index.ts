type ParseInt<T extends string> = T extends `${infer N extends number}`
  ? N
  : never

type ExpandByOne<
  V extends number,
  List extends Array<any> = []
> = List["length"] extends V ? List : ExpandByOne<V, [0, ...List]>

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
  T extends string,
  Rest extends Array<any> = []
> = `${T}` extends `${infer L extends number}${infer R}`
  ? ExpandToArray<R, [...ExpandByTen<Rest>, ...ExpandByOne<L>]>
  : Rest

type _Add<X extends string, Y extends string> = [
  ...ExpandToArray<ParseInt<X>>,
  ...ExpandToArray<ParseInt<Y>>
]["length"]

export type Add<X extends string, Y extends string> = _Add<X, Y> extends number
  ? `${_Add<X, Y>}`
  : never
