type ParseNumber<T extends string | number> =
  `${T}` extends `${infer N extends number}` ? N : never

type ParseFloat<T extends string | number> =
  `${T}` extends `${infer Int extends number}.${infer Frac extends string}`
    ? { int: Int; frac: Frac }
    : `${T}` extends `${infer Int extends number}`
    ? { int: Int; frac: "" }
    : never

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

type IsLeftArrLarger<
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
    ? IsLeftArrLarger<AR, BR>
    : never
  : never

type PadEnd<A extends any[], TL extends number> = A["length"] extends TL
  ? A
  : PadEnd<[...A, 0], TL>

type MatchLength<A extends any[], B extends any[]> = IsLeftArrLarger<
  A,
  B
> extends infer Comp extends boolean
  ? Comp extends true
    ? [PadEnd<A, B["length"]>, B]
    : Comp extends false
    ? [A, PadEnd<B, A["length"]>]
    : never
  : never

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

type _Add<X extends string | number, Y extends string | number> = [
  ...ExpandToArray<ParseNumber<X>>,
  ...ExpandToArray<ParseNumber<Y>>
]["length"]

export type Add<X extends string | number, Y extends string | number> = _Add<
  X,
  Y
> extends number
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

type ExplodeFloat<T extends string> =
  T extends `${infer Digit extends number}${infer Rest}`
    ? [Digit, ...ExplodeFloat<Rest>]
    : []

type CompressSumArr<T extends number[]> = T extends [
  infer A extends number,
  ...infer R extends number[]
]
  ? `${A}${CompressSumArr<R>}`
  : ""

type StringifyFrac<T extends { int: number; frac: string }> =
  `${T["int"]}.${T["frac"]}`

type _AddFrac<
  A extends string | number,
  B extends string | number
> = ParseFloat<A> extends infer AF extends { int: number; frac: string }
  ? ParseFloat<B> extends infer BF extends { int: number; frac: string }
    ? _Add<AF["int"], BF["int"]> extends infer IntValue extends number
      ? MatchLength<
          ExplodeFloat<AF["frac"]>,
          ExplodeFloat<BF["frac"]>
        > extends infer MatchArray extends [number[], number[]]
        ? SumArr<MatchArray[0], MatchArray[1]> extends [
            infer FracResult extends number[],
            infer Carry extends boolean
          ]
          ? Carry extends true
            ? { int: _Add<IntValue, 1>; frac: CompressSumArr<FracResult> }
            : Carry extends false
            ? { int: IntValue; frac: CompressSumArr<FracResult> }
            : never
          : never
        : never
      : never
    : never
  : never

export type AddFrac<
  A extends string | number,
  B extends string | number
> = StringifyFrac<_AddFrac<A, B>>
