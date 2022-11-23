type ParseInt<T extends string> = T extends `${infer N extends number}`
  ? N
  : never

type ExpandToArray<
  V extends number,
  List extends Array<0> = []
> = List["length"] extends V ? List : ExpandToArray<V, [0, ...List]>

type _Add<X extends string, Y extends string> = [
  ...ExpandToArray<ParseInt<X>>,
  ...ExpandToArray<ParseInt<Y>>
]["length"]

export type Add<X extends string, Y extends string> = _Add<X, Y> extends number
  ? `${_Add<X, Y>}`
  : never
