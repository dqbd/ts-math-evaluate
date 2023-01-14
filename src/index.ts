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

type AddMapCarry = [
  [
    [0, false],
    [1, false],
    [2, false],
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, false],
    [8, false],
    [9, false]
  ],
  [
    [1, false],
    [2, false],
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, false],
    [8, false],
    [9, false],
    [0, true]
  ],
  [
    [2, false],
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, false],
    [8, false],
    [9, false],
    [0, true],
    [1, true]
  ],
  [
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, false],
    [8, false],
    [9, false],
    [0, true],
    [1, true],
    [2, true]
  ],
  [
    [4, false],
    [5, false],
    [6, false],
    [7, false],
    [8, false],
    [9, false],
    [0, true],
    [1, true],
    [2, true],
    [3, true]
  ],
  [
    [5, false],
    [6, false],
    [7, false],
    [8, false],
    [9, false],
    [0, true],
    [1, true],
    [2, true],
    [3, true],
    [4, true]
  ],
  [
    [6, false],
    [7, false],
    [8, false],
    [9, false],
    [0, true],
    [1, true],
    [2, true],
    [3, true],
    [4, true],
    [5, true]
  ],
  [
    [7, false],
    [8, false],
    [9, false],
    [0, true],
    [1, true],
    [2, true],
    [3, true],
    [4, true],
    [5, true],
    [6, true]
  ],
  [
    [8, false],
    [9, false],
    [0, true],
    [1, true],
    [2, true],
    [3, true],
    [4, true],
    [5, true],
    [6, true],
    [7, true]
  ],
  [
    [9, false],
    [0, true],
    [1, true],
    [2, true],
    [3, true],
    [4, true],
    [5, true],
    [6, true],
    [7, true],
    [8, true]
  ]
]

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

type G<A extends any[], B extends any[]> = A extends []
  ? "left"
  : B extends []
  ? "right"
  : A extends [unknown, ...infer AR]
  ? B extends [unknown, ...infer BR]
    ? G<AR, BR>
    : never
  : never

type PadTest<A extends any[], TL extends number> = A["length"] extends TL
  ? A
  : PadTest<[...A, 0], TL>

type MatchLength<Comp, A extends any[], B extends any[]> = Comp extends "left"
  ? PadTest<A, B["length"]>
  : Comp extends "right"
  ? PadTest<B, A["length"]>
  : never

type ReverseArray<A extends any[]> = A extends [...infer Rest, infer F]
  ? [F, ...ReverseArray<Rest>]
  : []

type BitAnd<A extends boolean, B extends boolean> = A extends true
  ? B extends true
    ? true
    : false
  : false

type BitOr<A extends boolean, B extends boolean> = A extends true
  ? true
  : B extends true
  ? true
  : false

type BitXor<A extends boolean, B extends boolean> = [A, B] extends
  | [true, false]
  | [false, true]
  ? true
  : false

type AddWithCarry<
  A extends number,
  B extends number,
  C extends boolean
> = C extends true
  ? AddMapCarry[A][1] extends [infer R extends number, boolean]
    ? AddWithCarry<R, B, false>
    : never
  : AddMapCarry[A][B]

type SumArr<
  A extends number[],
  B extends number[],
  Tmp extends [number[], boolean] = [[], false]
> = A extends [...infer AR extends number[], infer AF extends number]
  ? B extends [...infer BR extends number[], infer BF extends number]
    ? Tmp extends [
        infer ResultTmp extends number[],
        infer CarryTmp extends boolean
      ]
      ? AddWithCarry<AF, BF, CarryTmp> extends [
          infer Digit extends number,
          infer Carry extends boolean
        ]
        ? SumArr<AR, BR, [[Digit, ...ResultTmp], Carry]>
        : never
      : never
    : never
  : Tmp

type ZZZ = SumArr<[1, 2, 3], [9, 3, 7]>

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

// Development types
type A = [0, 1, 3, 8, 2, 1]
type B = [2, 1]
type XXX = MatchLength<G<B, A>, B, A>
type YYY = ReverseArray<[1, 2, 3, 2, 2]>
