import { CmpMap } from "./utils/map"
import {
  Digit,
  FloatNumber,
  PadFloat,
  ParseFloatNumber,
  ParseSignFloatNumber,
  SignFloatNumber,
} from "./utils/parse"

export type CompareDigits<X extends Digit[], Y extends Digit[]> = [
  X,
  Y
] extends [
  [infer XHead extends Digit, ...infer XRest extends Digit[]],
  [infer YHead extends Digit, ...infer YRest extends Digit[]]
]
  ? CmpMap[XHead][YHead] extends infer Result extends number
    ? Result extends 0
      ? CompareDigits<XRest, YRest>
      : Result
    : never
  : 0

// $ExpectType -1
type CompareCase1 = CompareDigits<[1], [2]>

// $ExpectType 1
type CompareCase2 = CompareDigits<[2], [1]>

// $ExpectType 0
type CompareCase3 = CompareDigits<[2], [2]>

// $ExpectType -1
type CompareCase4 = CompareDigits<[2, 3, 9], [2, 4, 1]>

// $ExpectType 1
type CompareCase5 = CompareDigits<[2, 8, 9], [2, 4, 1]>

export type CompareAbsNumbers<
  X extends FloatNumber,
  Y extends FloatNumber
> = PadFloat<X, Y> extends [
  infer X extends FloatNumber,
  infer Y extends FloatNumber
]
  ? CompareDigits<X["int"], Y["int"]> extends infer IntCmp extends number
    ? IntCmp extends 0
      ? CompareDigits<X["frac"], Y["frac"]>
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

type CompareSignNumbers<
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
