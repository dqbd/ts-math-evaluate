import { AddSignFloatNumber } from "./add"
import { DivideInt, DivideSignFloatNumber } from "./divide"
import { MultiplySignFloat } from "./multiply"
import { PowerSignFloatNumbers } from "./power"
import { SubDigit, SubSignFloatNumber } from "./subtract"
import {
  Digit,
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

type OneSignFloatNumber = SignFloatNumber<"+", FloatNumber<[1], []>>

type RootNSubOne<N extends Digit[]> = SignFloatNumber<
  "+",
  FloatNumber<SubDigit<N, [1]>, []>
>

type RootNInverse<N extends Digit[]> = SignFloatNumber<"+", DivideInt<[1], N>>

// Newton's method
type RootStepNext<
  Alpha extends SignFloatNumber,
  NInverse extends SignFloatNumber,
  NSubOne extends SignFloatNumber,
  Step extends SignFloatNumber
> = PowerSignFloatNumbers<
  Step,
  NSubOne
> extends infer StepPowNSubOne extends SignFloatNumber
  ? DivideSignFloatNumber<
      Alpha,
      StepPowNSubOne
    > extends infer RightAdd extends SignFloatNumber
    ? MultiplySignFloat<
        NSubOne,
        Step
      > extends infer LeftAdd extends SignFloatNumber
      ? AddSignFloatNumber<
          LeftAdd,
          RightAdd
        > extends infer Bracket extends SignFloatNumber
        ? MultiplySignFloat<NInverse, Bracket>
        : never
      : never
    : never
  : never

type RootDigit<
  Alpha extends SignFloatNumber,
  N extends Digit[],
  Step extends SignFloatNumber = SignFloatNumber<"+", FloatNumber<[1], []>>,
  StepCnt extends Array<0> = []
> = StepCnt["length"] extends 7
  ? Step
  : RootNInverse<N> extends infer NInverse extends SignFloatNumber
  ? RootNSubOne<N> extends infer NSubOne extends SignFloatNumber
    ? RootStepNext<
        Alpha,
        NInverse,
        NSubOne,
        Step
      > extends infer NextStep extends SignFloatNumber
      ? RootDigit<Alpha, N, NextStep, [...StepCnt, 0]>
      : never
    : never
  : never

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

type RootDigit2<
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
    ? StringifySignFloat<RootDigit2<XNumber, Root["float"]["int"]>>
    : never
  : never
