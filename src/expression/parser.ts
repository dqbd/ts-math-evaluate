import { Token } from "./lexer"
import { Error } from "./enum"

export namespace AST {
  export enum Type {
    Binary = "binary",
    Unary = "unary",
    Number = "number",
  }

  export type Binary<
    Left extends unknown = unknown,
    Op extends string = string,
    Right extends unknown = unknown
  > = {
    type: Type.Binary
    left: Left
    op: Op
    right: Right
  }

  export type Unary<
    Op extends string = string,
    Value extends unknown = unknown
  > = {
    type: Type.Unary
    op: Op
    value: Value
  }

  export type Number<Value extends string = string> = {
    type: Type.Number
    value: Value
  }

  export type _ = Binary | Unary | Number
}

/*
  START -> ADD
  
  ADD -> MUL ADDx
  ADDx -> + MUL ADDx
  ADDx -> - MUL ADDx
  ADDx ->

  MUL -> FACT MULx
  MULx -> * FACT MULx
  MULx -> / FACT MULx
  MULx -> % FACT MULx
  MULx ->

  FACT -> UNARY FACTx
  FACTx -> ! FACTx
  FACTx ->

  UNARY -> - UNARY
  UNARY -> + UNARY
  UNARY -> POW

  POW -> TERM POWx
  POWx -> ^ POW
  POWx ->

  TERM -> unary ( ADD )
  TERM -> binary ( ADD , ADD )
  TERM -> ( ADD )
  TERM -> number
*/
export namespace RecursiveParser {
  interface Parser<T extends Token._[] = Token._[], A extends AST._ = AST._> {
    tokens: T
    head: T[0]
    return: A
  }

  type ReturnParser<TParser extends Parser, A extends AST._> = Parser<
    TParser["tokens"],
    A
  >

  type ConsumeParser<
    Match extends Token._,
    TParser extends Parser
  > = TParser["head"] extends Match
    ? TParser["tokens"] extends [Token._, ...infer Rest extends Token._[]]
      ? Parser<Rest, TParser["return"]>
      : []
    : Error.Parser

  type TERM<T extends Parser> =
    T["head"] extends infer Head extends Token.UnaryFunction
      ? ConsumeParser<Token.UnaryFunction, T> extends infer T extends Parser
        ? ConsumeParser<Token.LeftBracket, T> extends infer T extends Parser
          ? ADD<T> extends infer T extends Parser
            ? ConsumeParser<
                Token.RightBracket,
                T
              > extends infer T extends Parser
              ? ReturnParser<T, AST.Unary<Head["value"], T["return"]>>
              : Error.Parser
            : Error.Parser
          : Error.Parser
        : Error.Parser
      : T["head"] extends infer Head extends Token.BinaryFunction
      ? ConsumeParser<Token.BinaryFunction, T> extends infer T extends Parser
        ? ConsumeParser<Token.LeftBracket, T> extends infer T extends Parser
          ? ADD<T> extends infer L extends Parser
            ? ConsumeParser<Token.Comma, L> extends infer L extends Parser
              ? ADD<L> extends infer R extends Parser
                ? ConsumeParser<
                    Token.RightBracket,
                    R
                  > extends infer R extends Parser
                  ? ReturnParser<
                      R,
                      AST.Binary<L["return"], Head["value"], R["return"]>
                    >
                  : Error.Parser
                : Error.Parser
              : Error.Parser
            : Error.Parser
          : Error.Parser
        : Error.Parser
      : T["head"] extends Token.LeftBracket
      ? ConsumeParser<Token.LeftBracket, T> extends infer T extends Parser
        ? ADD<T> extends infer T extends Parser
          ? ConsumeParser<Token.RightBracket, T> extends infer T extends Parser
            ? T
            : Error.Parser
          : Error.Parser
        : Error.Parser
      : T["head"] extends infer Head extends Token.Number
      ? ConsumeParser<Token.Number, T> extends infer T extends Parser
        ? ReturnParser<T, AST.Number<Head["value"]>>
        : Error.Parser
      : Error.Parser

  type POWx<T extends Parser> = T["head"] extends Token.Power
    ? ConsumeParser<Token.Power, T> extends infer T extends Parser
      ? POW<T> extends infer R extends Parser
        ? ReturnParser<R, AST.Binary<T["return"], "^", R["return"]>>
        : Error.Parser
      : Error.Parser
    : T["head"] extends
        | Token.Factorial
        | Token.Multiply
        | Token.Divide
        | Token.Modulo
        | Token.Plus
        | Token.Minus
        | Token.EOF
        | Token.RightBracket
        | Token.Comma
    ? T
    : Error.Parser

  type POW<T extends Parser> = T["head"] extends
    | Token.UnaryFunction
    | Token.BinaryFunction
    | Token.LeftBracket
    | Token.Number
    ? TERM<T> extends infer T extends Parser
      ? POWx<T> extends infer T extends Parser
        ? T
        : Error.Parser
      : Error.Parser
    : Error.Parser

  type UNARY<T extends Parser> = T["head"] extends Token.Minus
    ? ConsumeParser<Token.Minus, T> extends infer T extends Parser
      ? UNARY<T> extends infer T extends Parser
        ? ReturnParser<T, AST.Unary<"-", T["return"]>>
        : Error.Parser
      : Error.Parser
    : T["head"] extends Token.Plus
    ? ConsumeParser<Token.Plus, T> extends infer T extends Parser
      ? UNARY<T> extends infer T extends Parser
        ? ReturnParser<T, AST.Unary<"+", T["return"]>>
        : Error.Parser
      : Error.Parser
    : T["head"] extends
        | Token.UnaryFunction
        | Token.BinaryFunction
        | Token.LeftBracket
        | Token.Number
    ? POW<T> extends infer T extends Parser
      ? T
      : Error.Parser
    : Error.Parser

  type FACTx<T extends Parser> = T["head"] extends Token.Factorial
    ? ConsumeParser<Token.Factorial, T> extends infer T extends Parser
      ? FACTx<
          ReturnParser<T, AST.Unary<"!", T["return"]>>
        > extends infer T extends Parser
        ? T
        : Error.Parser
      : Error.Parser
    : T["head"] extends
        | Token.Multiply
        | Token.Divide
        | Token.Modulo
        | Token.Plus
        | Token.Minus
        | Token.EOF
        | Token.RightBracket
        | Token.Comma
    ? T
    : Error.Parser

  type FACT<T extends Parser> = T["head"] extends
    | Token.Minus
    | Token.Plus
    | Token.UnaryFunction
    | Token.BinaryFunction
    | Token.LeftBracket
    | Token.Number
    ? UNARY<T> extends infer T extends Parser
      ? FACTx<T> extends infer T extends Parser
        ? T
        : Error.Parser
      : Error.Parser
    : Error.Parser

  type MULx<T extends Parser> = T["head"] extends Token.Multiply
    ? ConsumeParser<Token.Multiply, T> extends infer T extends Parser
      ? FACT<T> extends infer R extends Parser
        ? MULx<
            ReturnParser<R, AST.Binary<T["return"], "*", R["return"]>>
          > extends infer T extends Parser
          ? T
          : Error.Parser
        : Error.Parser
      : Error.Parser
    : T["head"] extends Token.Divide
    ? ConsumeParser<Token.Divide, T> extends infer T extends Parser
      ? FACT<T> extends infer R extends Parser
        ? MULx<
            ReturnParser<R, AST.Binary<T["return"], "/", R["return"]>>
          > extends infer T extends Parser
          ? T
          : Error.Parser
        : Error.Parser
      : Error.Parser
    : T["head"] extends Token.Modulo
    ? ConsumeParser<Token.Modulo, T> extends infer T extends Parser
      ? FACT<T> extends infer R extends Parser
        ? MULx<
            ReturnParser<R, AST.Binary<T["return"], "%", R["return"]>>
          > extends infer T extends Parser
          ? T
          : Error.Parser
        : Error.Parser
      : Error.Parser
    : T["head"] extends
        | Token.Plus
        | Token.Minus
        | Token.EOF
        | Token.RightBracket
        | Token.Comma
    ? T
    : Error.Parser

  type MUL<T extends Parser> = T["head"] extends
    | Token.Minus
    | Token.Plus
    | Token.UnaryFunction
    | Token.BinaryFunction
    | Token.LeftBracket
    | Token.Number
    ? FACT<T> extends infer T extends Parser
      ? MULx<T> extends infer T extends Parser
        ? T
        : Error.Parser
      : Error.Parser
    : Error.Parser

  type ADDx<T extends Parser> = T["head"] extends Token.Plus
    ? ConsumeParser<Token.Plus, T> extends infer T extends Parser
      ? MUL<T> extends infer R extends Parser
        ? ADDx<
            ReturnParser<R, AST.Binary<T["return"], "+", R["return"]>>
          > extends infer T extends Parser
          ? T
          : Error.Parser
        : Error.Parser
      : Error.Parser
    : T["head"] extends Token.Minus
    ? ConsumeParser<Token.Minus, T> extends infer T extends Parser
      ? MUL<T> extends infer R extends Parser
        ? ADDx<
            ReturnParser<R, AST.Binary<T["return"], "-", R["return"]>>
          > extends infer T extends Parser
          ? T
          : Error.Parser
        : Error.Parser
      : Error.Parser
    : T["head"] extends Token.EOF | Token.RightBracket | Token.Comma
    ? T
    : Error.Parser

  type ADD<T extends Parser> = T["head"] extends
    | Token.Minus
    | Token.Plus
    | Token.UnaryFunction
    | Token.BinaryFunction
    | Token.LeftBracket
    | Token.Number
    ? MUL<T> extends infer T extends Parser
      ? ADDx<T> extends infer T extends Parser
        ? T
        : Error.Parser
      : Error.Parser
    : Error.Parser

  type START<T extends Parser> = T["head"] extends
    | Token.Minus
    | Token.Plus
    | Token.UnaryFunction
    | Token.BinaryFunction
    | Token.LeftBracket
    | Token.Number
    ? ADD<T> extends infer T extends Parser
      ? ConsumeParser<Token.EOF, T> extends infer T extends Parser
        ? T
        : Error.Parser
      : Error.Parser
    : Error.Parser

  export type Parse<T extends Token._[]> = START<
    Parser<[...T, Token.EOF]>
  > extends infer T extends Parser
    ? T["return"]
    : never
}
