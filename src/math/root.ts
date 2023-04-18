import { AddSignFloatNumber } from "./add"
import { DivideSignFloatNumber } from "./divide"
import { MultiplySignFloat } from "./multiply"
import { PowerSignFloatNumbers } from "./power"
import { SubSignFloatNumber } from "./subtract"
import {
  Digit,
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

type OneSignFloatNumber = SignFloatNumber<"+", FloatNumber<[1], []>>

type RootDigitIter<
  NSubOne extends SignFloatNumber,
  L extends SignFloatNumber,
  R extends SignFloatNumber,
  Step extends SignFloatNumber = OneSignFloatNumber,
  StepCnt extends Array<0> = []
> = StepCnt["length"] extends 7
  ? Step
  : MultiplySignFloat<L, Step> extends infer LStep extends SignFloatNumber
  ? PowerSignFloatNumbers<
      Step,
      NSubOne
    > extends infer StepPowNSubOne extends SignFloatNumber
    ? DivideSignFloatNumber<
        R,
        StepPowNSubOne
      > extends infer RStep extends SignFloatNumber
      ? AddSignFloatNumber<
          LStep,
          RStep
        > extends infer Sum extends SignFloatNumber
        ? RootDigitIter<NSubOne, L, R, Sum, [...StepCnt, 0]>
        : never
      : never
    : never
  : never

type RootDigit<
  Alpha extends SignFloatNumber,
  N extends Digit[]
> = SignFloatNumber<
  "+",
  FloatNumber<N, []>
> extends infer N extends SignFloatNumber
  ? SubSignFloatNumber<
      N,
      OneSignFloatNumber
    > extends infer NSubOne extends SignFloatNumber
    ? DivideSignFloatNumber<NSubOne, N> extends infer L extends SignFloatNumber
      ? DivideSignFloatNumber<Alpha, N> extends infer R extends SignFloatNumber
        ? RootDigitIter<NSubOne, L, R>
        : never
      : never
    : never
  : never

export type Root<
  X extends NumberLike,
  N extends NumberLike
> = ParseSignFloatNumber<X> extends infer XNumber extends SignFloatNumber
  ? ParseSignFloatNumber<N> extends infer Root extends SignFloatNumber
    ? StringifySignFloat<RootDigit<XNumber, Root["float"]["int"]>>
    : never
  : never
