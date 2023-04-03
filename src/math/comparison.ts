import { PadStartEqually } from "../utils/array"
import { CmpMap } from "../utils/map"
import {
  Digit,
  FloatNumber,
  PadFloat,
  ParseFloatNumber,
  ParseSignFloatNumber,
  SignFloatNumber,
} from "../utils/parse"

type CompareArr<X extends Digit[], Y extends Digit[]> = [X, Y] extends [
  [infer XHead extends Digit, ...infer XRest extends Digit[]],
  [infer YHead extends Digit, ...infer YRest extends Digit[]]
]
  ? CmpMap[XHead][YHead] extends infer Result extends number
    ? Result extends 0
      ? CompareArr<XRest, YRest>
      : Result
    : never
  : 0

// $ExpectType -1
type CompareCase1 = CompareArr<[1], [2]>

// $ExpectType 1
type CompareCase2 = CompareArr<[2], [1]>

// $ExpectType 0
type CompareCase3 = CompareArr<[2], [2]>

// $ExpectType -1
type CompareCase4 = CompareArr<[2, 3, 9], [2, 4, 1]>

// $ExpectType 1
type CompareCase5 = CompareArr<[2, 8, 9], [2, 4, 1]>

export type CompareDigits<
  X extends Digit[],
  Y extends Digit[]
> = PadStartEqually<X, Y> extends [
  infer A extends Digit[],
  infer B extends Digit[]
]
  ? CompareArr<A, B>
  : never

export type CompareAbsNumbers<
  X extends FloatNumber,
  Y extends FloatNumber
> = PadFloat<X, Y> extends [
  infer X extends FloatNumber,
  infer Y extends FloatNumber
]
  ? CompareArr<X["int"], Y["int"]> extends infer IntCmp extends number
    ? IntCmp extends 0
      ? CompareArr<X["frac"], Y["frac"]>
      : IntCmp
    : never
  : never

// $ExpectType -1
type CompareAbsNumbersCase1 = CompareAbsNumbers<
  ParseFloatNumber<"123">,
  ParseFloatNumber<"456">
>

// $ExpectType 0
type CompareAbsNumbersCase2 = CompareAbsNumbers<
  ParseFloatNumber<"456">,
  ParseFloatNumber<"456">
>

// $ExpectType -1
type CompareAbsNumbersCase3 = CompareAbsNumbers<
  ParseFloatNumber<"0.123">,
  ParseFloatNumber<"456">
>

// $ExpectType 1
type CompareAbsNumbersCase4 = CompareAbsNumbers<
  ParseFloatNumber<"0.1234">,
  ParseFloatNumber<"0.123">
>

export type CompareSignNumbers<
  X extends SignFloatNumber,
  Y extends SignFloatNumber
> = {
  "+": {
    "+": CompareAbsNumbers<X["float"], Y["float"]>
    "-": 1
  }
  "-": {
    "+": -1
    "-": CompareAbsNumbers<Y["float"], X["float"]>
  }
}[X["sign"]][Y["sign"]]

// $ExpectType -1
type CompareSignNumbersCase1 = CompareSignNumbers<
  ParseSignFloatNumber<"123">,
  ParseSignFloatNumber<"456">
>

// $ExpectType 0
type CompareSignNumbersCase2 = CompareSignNumbers<
  ParseSignFloatNumber<"456">,
  ParseSignFloatNumber<"456">
>

// $ExpectType 1
type CompareSignNumbersCase3 = CompareSignNumbers<
  ParseSignFloatNumber<"456">,
  ParseSignFloatNumber<"123">
>

// $ExpectType 1
type CompareSignNumbersCase4 = CompareSignNumbers<
  ParseSignFloatNumber<"123">,
  ParseSignFloatNumber<"-123">
>

// $ExpectType -1
type CompareSignNumbersCase5 = CompareSignNumbers<
  ParseSignFloatNumber<"-123">,
  ParseSignFloatNumber<"123">
>

// $ExpectType -1
type CompareSignNumbersCase6 = CompareSignNumbers<
  ParseSignFloatNumber<"-0">,
  ParseSignFloatNumber<"0">
>

export type IsEvenInt<X extends Digit[]> = X extends [
  ...Digit[],
  infer Tail extends Digit
]
  ? Tail extends 0 | 2 | 4 | 6 | 8
    ? true
    : false
  : false

// $ExpectType true
type IsEvenCase1 = IsEvenInt<[1, 2, 0]>

// $ExpectType false
type IsEvenCase2 = IsEvenInt<[1]>
