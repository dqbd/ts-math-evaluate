export type TrimStart<List extends Array<any>> = List["length"] extends 1
  ? List
  : List extends [0, ...infer Rest]
  ? TrimStart<Rest>
  : List

export type TrimEnd<List extends Array<any>> = List["length"] extends 1
  ? List
  : List extends [...infer Rest, 0]
  ? TrimEnd<Rest>
  : List

export type PadStart<
  TL extends number,
  List extends Array<any> = []
> = List["length"] extends TL ? List : PadStart<TL, [0, ...List]>

export type PadEnd<
  TL extends number,
  List extends Array<any> = []
> = List["length"] extends TL ? List : PadEnd<TL, [...List, 0]>

type IsArrayLarger<
  A extends any[],
  B extends any[]
> = A["length"] extends B["length"]
  ? true
  : A extends []
  ? true
  : B extends []
  ? false
  : A extends [unknown, ...infer AR]
  ? B extends [unknown, ...infer BR]
    ? IsArrayLarger<AR, BR>
    : never
  : never

export type PadEndEqually<A extends any[], B extends any[]> = IsArrayLarger<
  A,
  B
> extends infer Comp extends boolean
  ? Comp extends true
    ? [PadEnd<B["length"], A>, B]
    : Comp extends false
    ? [A, PadEnd<A["length"], B>]
    : never
  : never

export type PadStartEqually<A extends any[], B extends any[]> = IsArrayLarger<
  A,
  B
> extends infer Comp extends boolean
  ? Comp extends true
    ? [PadStart<B["length"], A>, B]
    : Comp extends false
    ? [A, PadStart<A["length"], B>]
    : never
  : never

export type ExpandArrayByTen<R extends Array<0>> = [
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
