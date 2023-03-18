import { Add as AddImpl } from "../add"
import { Sub as SubImpl } from "../sub"
import { Neg as NegImpl } from "../neg"
import { NumberLike } from "../utils/parse"

interface Fn {
  input: unknown
  output: unknown
}

type Call<fn extends Fn, input> = (fn & { input: input })["output"]

type Reduce<List, Acc, fn extends Fn> = List extends [
  infer First,
  ...infer Rest
]
  ? Reduce<Rest, Call<fn, { acc: Acc; first: First }>, fn>
  : Acc

type Pipe<Acc, Funcs extends Fn[]> = Funcs extends [
  infer First extends Fn,
  ...infer Rest extends Fn[]
]
  ? Pipe<Call<First, Acc>, Rest>
  : Acc

namespace Math {
  export interface Add<Right extends NumberLike> extends Fn {
    output: this["input"] extends NumberLike
      ? AddImpl<this["input"], Right>
      : never
  }

  export interface Sub<Right extends NumberLike> extends Fn {
    output: this["input"] extends NumberLike
      ? SubImpl<this["input"], Right>
      : never
  }

  export interface Neg extends Fn {
    output: this["input"] extends NumberLike ? NegImpl<this["input"]> : never
  }
}

// $ExpectType "-445"
type X = Pipe<"123", [Math.Add<"345">, Math.Sub<"23">, Math.Neg]>
