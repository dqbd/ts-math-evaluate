import {
  Abs,
  Add,
  Ceil,
  Divide,
  Factorial,
  Floor,
  Modulo,
  Multiply,
  Negate,
  Root,
  Round,
  Subtract,
  Truncate,
} from "../math"
import { NumberLike } from "../utils/parse"
import { AST } from "./parser"

export type Evaluate<T> = T extends AST.BinaryType<
  infer Left,
  infer Op,
  infer Right
>
  ? Op extends "+"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Add<LeftStr, RightStr>
        : never
      : never
    : Op extends "-"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Subtract<LeftStr, RightStr>
        : never
      : never
    : Op extends "*"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Multiply<LeftStr, RightStr>
        : never
      : never
    : Op extends "/"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Divide<LeftStr, RightStr>
        : never
      : never
    : Op extends "^"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Modulo<LeftStr, RightStr>
        : never
      : never
    : Op extends "%"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Modulo<LeftStr, RightStr>
        : never
      : never
    : Op extends "root"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Root<LeftStr, RightStr>
        : never
      : never
    : never
  : T extends AST.UnaryType<infer Value, infer Op>
  ? Op extends "abs"
    ? Evaluate<Value> extends infer ValueStr extends NumberLike
      ? Abs<ValueStr>
      : never
    : Op extends "-"
    ? Evaluate<Value> extends infer ValueStr extends NumberLike
      ? Negate<ValueStr>
      : never
    : Op extends "+"
    ? Evaluate<Value> extends infer ValueStr extends NumberLike
      ? ValueStr
      : never
    : Op extends "ceil"
    ? Evaluate<Value> extends infer ValueStr extends NumberLike
      ? Ceil<ValueStr>
      : never
    : Op extends "floor"
    ? Evaluate<Value> extends infer ValueStr extends NumberLike
      ? Floor<ValueStr>
      : never
    : Op extends "round"
    ? Evaluate<Value> extends infer ValueStr extends NumberLike
      ? Round<ValueStr>
      : never
    : Op extends "truncate"
    ? Evaluate<Value> extends infer ValueStr extends NumberLike
      ? Truncate<ValueStr>
      : never
    : Op extends "!"
    ? Evaluate<Value> extends infer ValueStr extends NumberLike
      ? Factorial<ValueStr>
      : never
    : never
  : T extends AST.NumberType<infer Value extends string>
  ? Value
  : never
