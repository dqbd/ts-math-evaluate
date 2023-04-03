import { Token } from "./lexer"

type Fail = "ParserFail"

/**
 * Parser
 */
export type BinaryItem<Left, Op extends string, Right> = {
  type: "binary"
  left: Left
  op: Op
  right: Right
}
export type UnaryItem<Value, Op extends string> = {
  type: "unary"
  op: Op
  value: Value
}

export type NumberItem<Value extends string = ""> = {
  type: "number"
  value: Value
}

type ParseResult<T extends Token[] = [], Result = unknown> = {
  tokens: T
  ast: Result
}

type ParseTerm<T extends Token[]> = T extends [
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

type ParseMul<T extends Token[]> = T extends Token[]
  ? ParseTerm<T> extends ParseResult<infer PrimaryTokens, infer PrimaryAst>
    ? PrimaryTokens extends [
        { type: "Multiply" | "Divide" },
        ...infer NewRest extends Token[]
      ]
      ? ParseMul<NewRest> extends ParseResult<
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

type ParseAdd<T extends Token[]> = T extends Token[]
  ? ParseMul<T> extends ParseResult<infer FactorTokens, infer FactorAst>
    ? FactorTokens extends [
        { type: "Plus" | "Minus" },
        ...infer NewRest extends Token[]
      ]
      ? ParseAdd<NewRest> extends ParseResult<
          infer TermTokens,
          infer TermAst
        >
        ? ParseResult<
            TermTokens,
            BinaryItem<FactorAst, FactorTokens[0]["type"], TermAst>
          >
        : never
      : ParseResult<FactorTokens, FactorAst>
    : Fail
  : Fail

type ParseExpression<T extends Token[]> = ParseAdd<T>

// TODO: implement mod, functions, unary minus and factor
export type Parser<T extends Token[]> =
  ParseExpression<T> extends infer Result extends ParseResult
    ? Result["ast"]
    : never

/*
 add -> mul add'
 add' -> + mul add'
 add' -> - mul add'
 add' -> ε
 mul -> term mul'
 mul' -> * term mul'
 mul' -> / term mul'
 mul' -> ε
 term -> ( add )
 term -> num
*/
