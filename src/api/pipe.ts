import { Add as _Add } from "../math"
import { Subtract as _Subtract } from "../math"
import { Multiply as _Multiply } from "../math"
import { Divide as _Divide } from "../math"
import { Power as _Power } from "../math"
import { Modulo as _Modulo } from "../math"
import { Root as _Root } from "../math"

import { Abs as _Abs } from "../math"
import { Negate as _Negate } from "../math"
import { Ceil as _Ceil } from "../math"
import { Floor as _Floor } from "../math"
import { Round as _Round } from "../math"
import { Truncate as _Truncate } from "../math"
import { Factorial as _Factorial } from "../math"

import { NumberLike } from "../utils/parse"

interface Fn {
  input: unknown
  output: unknown
}

type Call<fn extends Fn, input> = (fn & { input: input })["output"]

type Pipe<Acc, Funcs extends Fn[]> = Funcs extends [
  infer First extends Fn,
  ...infer Rest extends Fn[]
]
  ? Pipe<Call<First, Acc>, Rest>
  : Acc

namespace Math {
  export interface Add<Right extends NumberLike> extends Fn {
    output: this["input"] extends NumberLike
      ? _Add<this["input"], Right>
      : never
  }

  export interface Subtract<Right extends NumberLike> extends Fn {
    output: this["input"] extends NumberLike
      ? _Subtract<this["input"], Right>
      : never
  }

  export interface Multiply<Right extends NumberLike> extends Fn {
    output: this["input"] extends NumberLike
      ? _Multiply<this["input"], Right>
      : never
  }

  export interface Divide<Right extends NumberLike> extends Fn {
    output: this["input"] extends NumberLike
      ? _Divide<this["input"], Right>
      : never
  }

  export interface Power<Right extends NumberLike> extends Fn {
    output: this["input"] extends NumberLike
      ? _Power<this["input"], Right>
      : never
  }

  export interface Modulo<Right extends NumberLike> extends Fn {
    output: this["input"] extends NumberLike
      ? _Modulo<this["input"], Right>
      : never
  }

  export interface Root<Right extends NumberLike> extends Fn {
    output: this["input"] extends NumberLike
      ? _Root<this["input"], Right>
      : never
  }

  export interface Abs extends Fn {
    output: this["input"] extends NumberLike ? _Abs<this["input"]> : never
  }

  export interface Negate extends Fn {
    output: this["input"] extends NumberLike ? _Negate<this["input"]> : never
  }

  export interface Ceil extends Fn {
    output: this["input"] extends NumberLike ? _Ceil<this["input"]> : never
  }

  export interface Floor extends Fn {
    output: this["input"] extends NumberLike ? _Floor<this["input"]> : never
  }

  export interface Round extends Fn {
    output: this["input"] extends NumberLike ? _Round<this["input"]> : never
  }

  export interface Truncate extends Fn {
    output: this["input"] extends NumberLike ? _Truncate<this["input"]> : never
  }

  export interface Factorial extends Fn {
    output: this["input"] extends NumberLike ? _Factorial<this["input"]> : never
  }
}

// $ExpectType "-445"
type X = Pipe<"123", [Math.Add<"345">, Math.Subtract<"23">, Math.Negate]>
