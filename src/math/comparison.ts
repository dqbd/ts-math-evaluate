import { PadStartEqually } from "../utils/array"
import { CmpMap } from "../utils/map"
import { Digit, FloatNumber, PadFloat, SignFloatNumber } from "../utils/parse"

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

export type IsEvenInt<X extends Digit[]> = X extends [
  ...Digit[],
  infer Tail extends Digit
]
  ? Tail extends 0 | 2 | 4 | 6 | 8
    ? true
    : false
  : false
