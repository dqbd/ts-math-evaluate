import { Fn, PartialApply } from "hotscript"
import { NumberLike } from "./utils/parse"
import * as Impl from "./math"

export namespace Math {
  type unset = "@hotscript/unset"

  export type Add<
    Left extends NumberLike | unset = unset,
    Right extends NumberLike | unset = unset
  > = PartialApply<AddFn, [Left, Right]>
  interface AddFn extends Fn {
    return: this["args"] extends [
      infer Left extends NumberLike,
      infer Right extends NumberLike
    ]
      ? Impl.Add<Left, Right>
      : never
  }

  export interface Subtract<Right extends NumberLike> extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Subtract<Left, Right>
      : never
  }

  export interface Multiply<Right extends NumberLike> extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Multiply<Left, Right>
      : never
  }

  export interface Divide<Right extends NumberLike> extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Divide<Left, Right>
      : never
  }

  export interface Power<Right extends NumberLike> extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Power<Left, Right>
      : never
  }

  export interface Modulo<Right extends NumberLike> extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Modulo<Left, Right>
      : never
  }

  export interface Root<Right extends NumberLike> extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Root<Left, Right>
      : never
  }

  export interface Abs extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Abs<Left>
      : never
  }

  export interface Negate extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Negate<Left>
      : never
  }

  export interface Ceil extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Ceil<Left>
      : never
  }

  export interface Floor extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Floor<Left>
      : never
  }

  export interface Round extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Round<Left>
      : never
  }

  export interface Truncate extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Truncate<Left>
      : never
  }

  export interface Factorial extends Fn {
    return: this["args"] extends [infer Left extends NumberLike]
      ? Impl.Factorial<Left>
      : never
  }
}
