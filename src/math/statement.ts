import { Add } from "../add"
import { Divide } from "../div"
import { Factorial } from "../factorial"
import { Mod } from "../mod"
import { Multiply } from "../mul"
import { Neg } from "../neg"
import { Sub } from "../sub"
import { NumberLike } from "../utils/parse"

/**
 * Lexer
 */
type Token =
  | { type: "Number"; value: string }
  | { type: "Identifier"; value: string }
  | { type: "Plus" }
  | { type: "Minus" }
  | { type: "Multiply" }
  | { type: "Divide" }
  | { type: "LeftParenthesis" }
  | { type: "RightParenthesis" }
  | { type: "Factorial" }
  | { type: "Modulo" }
  | { type: "Power" }

type Fail = { type: "Fail" }

type HandleResult<Rest extends string, Result extends Token> = {
  result: Result
  rest: Rest
}

type Digits = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

type Letters =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"

type HandleDigitsResult<Rest extends string, Result extends string> = {
  result: Result
  rest: Rest
}

type HandleDigits<
  T extends string,
  NumAcc extends string = ""
> = T extends `${infer Head extends Digits}${infer Rest}`
  ? HandleDigits<Rest, `${NumAcc}${Head}`>
  : NumAcc extends ""
  ? Fail
  : HandleDigitsResult<T, NumAcc>

type HandleNumberFinish<
  T extends string,
  SignAcc extends string = "",
  IntAcc extends string = "",
  FloatAcc extends string | null = null
> = FloatAcc extends null | ""
  ? IntAcc extends ""
    ? Fail
    : HandleResult<T, { type: "Number"; value: `${SignAcc}${IntAcc}` }>
  : HandleResult<
      T,
      { type: "Number"; value: `${SignAcc}${IntAcc}.${FloatAcc}` }
    >

// TODO: add tests
type HandleNumber<
  T extends string,
  SignAcc extends string = "",
  IntAcc extends string = "",
  FloatAcc extends string | null = null
> = T extends `${infer Head extends "+" | "-"}${infer Rest}`
  ? SignAcc extends ""
    ? HandleNumber<Rest, Head, IntAcc, FloatAcc>
    : HandleNumberFinish<T, SignAcc, IntAcc, FloatAcc>
  : T extends `${"."}${infer Rest}`
  ? FloatAcc extends null
    ? HandleNumber<Rest, SignAcc, IntAcc, "">
    : HandleNumberFinish<T, SignAcc, IntAcc, FloatAcc>
  : HandleDigits<T> extends HandleDigitsResult<infer Rest, infer Num>
  ? FloatAcc extends ""
    ? HandleNumber<Rest, SignAcc, IntAcc, Num>
    : HandleNumber<Rest, SignAcc, Num, FloatAcc>
  : HandleNumberFinish<T, SignAcc, IntAcc, FloatAcc>

type HandleIdentifier<
  T extends string,
  StrAcc extends string = ""
> = T extends `${infer Head extends Letters}${infer Rest}`
  ? HandleIdentifier<Rest, `${StrAcc}${Head}`>
  : StrAcc extends ""
  ? Fail
  : HandleResult<T, { type: "Identifier"; value: StrAcc }>

type HandleToken<T extends string> = T extends `${infer Head}${infer Rest}`
  ? Head extends "+"
    ? HandleResult<Rest, { type: "Plus" }>
    : Head extends "-"
    ? HandleResult<Rest, { type: "Minus" }>
    : Head extends "*"
    ? HandleResult<Rest, { type: "Multiply" }>
    : Head extends "/"
    ? HandleResult<Rest, { type: "Divide" }>
    : Head extends "("
    ? HandleResult<Rest, { type: "LeftParenthesis" }>
    : Head extends ")"
    ? HandleResult<Rest, { type: "RightParenthesis" }>
    : Head extends "!"
    ? HandleResult<Rest, { type: "Factorial" }>
    : Head extends "%"
    ? HandleResult<Rest, { type: "Modulo" }>
    : Head extends "^"
    ? HandleResult<Rest, { type: "Power" }>
    : Fail
  : Fail

export type Lexer<
  T extends string,
  Result extends Token[] = []
> = T extends `${infer S}${infer Rest}`
  ? S extends " "
    ? Lexer<Rest, Result>
    : HandleNumber<T> extends HandleResult<infer Rest, infer NewToken>
    ? Lexer<Rest, [...Result, NewToken]>
    : HandleIdentifier<T> extends HandleResult<infer Rest, infer NewToken>
    ? Lexer<Rest, [...Result, NewToken]>
    : HandleToken<T> extends HandleResult<infer Rest, infer NewToken>
    ? Lexer<Rest, [...Result, NewToken]>
    : never
  : Result

type LexerCase1 = Lexer<"aaaa(323) + sgn(24)">

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

// $ExpectType "-32"
type EvaluateCase2 = Evaluate<Parser<Lexer<"-64 + 10 * 0 + 32">>>
