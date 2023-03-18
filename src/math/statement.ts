import { Add } from "../add"
import { Divide } from "../div"
import { Factorial } from "../factorial"
import { Mod } from "../mod"
import { Multiply } from "../mul"
import { Neg } from "../neg"
import { Sub } from "../sub"
import { NumberLike } from "../utils/parse"

type BinaryItem<Left, Op extends string, Right> = {
  type: "binary"
  left: Left
  op: Op
  right: Right
}

type UnaryItem<Value, Op extends string> = {
  type: "unary"
  op: Op
  value: Value
}

type NumberItem<Value extends string = ""> = { type: "number"; value: Value }

/**
 * Parser
 */

type ParseResult<T extends Token[] = [], Result = unknown> = {
  tokens: T
  ast: Result
}

// TODO: implement mod, functions, unary minus and factor
type Parser<T extends Token[]> =
  ParseExpression<T> extends infer Result extends ParseResult
    ? Result["ast"]
    : never

type ParsePrimary<T extends Token[]> = T extends [
  { type: "Number"; value: string },
  ...infer Rest extends Token[]
]
  ? ParseResult<Rest, NumberItem<T[0]["value"]>>
  : T extends [{ type: "LeftParenthesis" }, ...infer Rest extends Token[]]
  ? ParseExpression<Rest> extends ParseResult<infer ExprTokens, infer ExprAst>
    ? ExprTokens extends [
        { type: "RightParenthesis" },
        ...infer Rest extends Token[]
      ]
      ? ParseResult<Rest, ExprAst>
      : never
    : never
  : Fail

type ParseFactor<T extends Token[]> = T extends Token[]
  ? ParsePrimary<T> extends ParseResult<infer PrimaryTokens, infer PrimaryAst>
    ? PrimaryTokens extends [
        { type: "Multiply" | "Divide" },
        ...infer NewRest extends Token[]
      ]
      ? ParseFactor<NewRest> extends ParseResult<
          infer FactorTokens,
          infer FactorAst
        >
        ? ParseResult<
            FactorTokens,
            BinaryItem<PrimaryAst, PrimaryTokens[0]["type"], FactorAst>
          >
        : never
      : ParseResult<PrimaryTokens, PrimaryAst>
    : Fail
  : Fail

type ParseTerm<T extends Token[]> = T extends Token[]
  ? ParseFactor<T> extends ParseResult<infer FactorTokens, infer FactorAst>
    ? FactorTokens extends [
        { type: "Plus" | "Minus" },
        ...infer NewRest extends Token[]
      ]
      ? ParseTerm<NewRest> extends ParseResult<infer TermTokens, infer TermAst>
        ? ParseResult<
            TermTokens,
            BinaryItem<FactorAst, FactorTokens[0]["type"], TermAst>
          >
        : never
      : ParseResult<FactorTokens, FactorAst>
    : Fail
  : Fail

type ParseExpression<T extends Token[]> = ParseTerm<T>

type ParserCase1 = Parser<Lexer<"3.1 + 2.5 * (1 - 5.6) / 4.2">>

/**
 * Lexer
 */
type Token =
  | { type: "Number"; value: string }
  | { type: "Plus" }
  | { type: "Minus" }
  | { type: "Multiply" }
  | { type: "Divide" }
  | { type: "LeftParenthesis" }
  | { type: "RightParenthesis" }

type Fail = { type: "Fail" }

type HandleResult<Rest extends string, Result extends Token> = {
  result: Result
  rest: Rest
}

// TODO: stricter handling of decimal places
// TODO: support signed/negative numbers
type HandleNumber<
  T extends string,
  NumAcc extends string = ""
> = T extends `${infer R}${infer S}`
  ? R extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "."
    ? HandleNumber<S, `${NumAcc}${R}`>
    : NumAcc extends ""
    ? Fail
    : HandleResult<T, { type: "Number"; value: NumAcc }>
  : NumAcc extends ""
  ? Fail
  : HandleResult<T, { type: "Number"; value: NumAcc }>

type HandleToken<T extends string> = T extends `${infer R}${infer S}`
  ? R extends "+"
    ? HandleResult<S, { type: "Plus" }>
    : R extends "-"
    ? HandleResult<S, { type: "Minus" }>
    : R extends "*"
    ? HandleResult<S, { type: "Multiply" }>
    : R extends "/"
    ? HandleResult<S, { type: "Divide" }>
    : R extends "("
    ? HandleResult<S, { type: "LeftParenthesis" }>
    : R extends ")"
    ? HandleResult<S, { type: "RightParenthesis" }>
    : Fail
  : Fail

type Lexer<
  T extends string,
  Result extends Token[] = []
> = T extends `${infer S}${infer Rest}`
  ? S extends " "
    ? Lexer<Rest, Result>
    : HandleToken<T> extends HandleResult<infer Rest, infer NewToken>
    ? Lexer<Rest, [...Result, NewToken]>
    : HandleNumber<T> extends HandleResult<infer Rest, infer NewToken>
    ? Lexer<Rest, [...Result, NewToken]>
    : never
  : Result

type LexerCase1 = Lexer<"323 + 24">

/**
 * AST + evaluator
 */

// TODO: functions (abs, ceil, floor, round, truncate)
type Evaluate<T> = T extends BinaryItem<infer Left, infer Op, infer Right>
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

// $ExpectType "0.36190476200"
type EvaluateCase1 = Evaluate<Parser<Lexer<"3.1 + 2.5 * (1 - 5.6) / 4.2">>>
