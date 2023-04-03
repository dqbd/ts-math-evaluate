import { Add } from "../add"
import { Divide } from "../div"
import { Factorial } from "../factorial"
import { Mod } from "../mod"
import { Multiply } from "../mul"
import { Neg } from "../neg"
import { Sub } from "../sub"
import { NumberLike } from "../utils/parse"
import { BinaryItem, UnaryItem, NumberItem } from "./parser"

// TODO: functions (abs, ceil, floor, round, truncate)
export type Evaluate<T> = T extends BinaryItem<
  infer Left,
  infer Op,
  infer Right
>
  ? Op extends "Multiply"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Multiply<LeftStr, RightStr>
        : never
      : never
    : Op extends "Plus"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Add<LeftStr, RightStr>
        : never
      : never
    : Op extends "Divide"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Divide<LeftStr, RightStr>
        : never
      : never
    : Op extends "Minus"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Sub<LeftStr, RightStr>
        : never
      : never
    : Op extends "Mod"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Mod<LeftStr, RightStr>
        : never
      : never
    : never
  : T extends UnaryItem<infer Value, infer Op>
  ? Op extends "Minus"
    ? Evaluate<Value> extends infer ValueStr extends NumberLike
      ? Neg<ValueStr>
      : never
    : Op extends "Factor"
    ? Evaluate<Value> extends infer ValueStr extends NumberLike
      ? Factorial<ValueStr>
      : never
    : never
  : T extends NumberItem<infer Value extends string>
  ? Value
  : never
