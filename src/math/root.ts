import { AddSignFloatNumber } from "./add"
import { DivideInt, DivideSignFloatNumber } from "./div"
import { MultiplySignFloat } from "./mul"
import { PowSignFloatNumbers } from "./pow"
import { SubDigit } from "./sub"
import {
  Digit,
  FloatNumber,
  NumberLike,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifySignFloat,
} from "../utils/parse"

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
> = PowSignFloatNumbers<
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
> = StepCnt["length"] extends 5
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

export type Root<
  X extends NumberLike,
  N extends NumberLike
> = ParseSignFloatNumber<X> extends infer XNumber extends SignFloatNumber
  ? ParseSignFloatNumber<N> extends infer Root extends SignFloatNumber
    ? StringifySignFloat<RootDigit<XNumber, Root["float"]["int"]>>
    : never
  : never
