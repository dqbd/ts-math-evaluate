import { Error } from "./enum"

// We can encapsulate the token type in a namespace
// to avoid name collisions and make it easier to read
// within the type hints
export namespace Token {
  export type Number<Value extends string = string> = {
    type: "Number"
    value: Value
  }
  export type Identifier<Value extends string = string> = {
    type: "Identifier"
    value: Value
  }
  export type Plus = { type: "Plus" }
  export type Minus = { type: "Minus" }
  export type Multiply = { type: "Multiply" }
  export type Divide = { type: "Divide" }
  export type LeftBracket = { type: "LeftBracket" }
  export type RightBracket = { type: "RightBracket" }
  export type Factorial = { type: "Factorial" }
  export type Power = { type: "Power" }
  export type Modulo = { type: "Modulo" }
  export type Comma = { type: "Comma" }

  export type UnaryFunction<Value extends string = string> = {
    type: "UnaryFunction"
    value: Value
  }

  export type BinaryFunction<Value extends string = string> = {
    type: "BinaryFunction"
    value: Value
  }

  export type EOF = { type: "EOF" }

  export type _ =
    | Number
    | UnaryFunction
    | BinaryFunction
    | Plus
    | Minus
    | Multiply
    | Divide
    | LeftBracket
    | RightBracket
    | Factorial
    | Power
    | Modulo
    | Comma
    | EOF
}

type LexResult<Rest extends string, Result extends Token._> = {
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

type LexDigits<
  T extends string,
  NumAcc extends string = ""
> = T extends `${infer Head extends Digits}${infer Rest}`
  ? LexDigits<Rest, `${NumAcc}${Head}`>
  : NumAcc extends ""
  ? Error.Lexer
  : LexResult<T, Token.Number<NumAcc>>

type LexNumberReturn<
  T extends string,
  SignAcc extends string = "",
  IntAcc extends string = "",
  FloatAcc extends string | null = null
> = FloatAcc extends null | ""
  ? IntAcc extends ""
    ? Error.Lexer
    : LexResult<T, Token.Number<`${SignAcc}${IntAcc}`>>
  : IntAcc extends ""
  ? LexResult<T, Token.Number<`${SignAcc}0.${FloatAcc}`>>
  : LexResult<T, Token.Number<`${SignAcc}${IntAcc}.${FloatAcc}`>>

type LexNumber<
  T extends string,
  SignAcc extends string = "",
  IntAcc extends string = "",
  FloatAcc extends string | null = null
> = T extends `${infer Sign extends "+" | "-"}${infer Rest}`
  ? SignAcc extends ""
    ? LexNumber<Rest, Sign, IntAcc, FloatAcc>
    : LexNumberReturn<T, SignAcc, IntAcc, FloatAcc>
  : T extends `.${infer Rest}`
  ? FloatAcc extends null
    ? LexNumber<Rest, SignAcc, IntAcc, "">
    : LexNumberReturn<T, SignAcc, IntAcc, FloatAcc>
  : LexDigits<T> extends LexResult<infer Rest, infer Token extends Token.Number>
  ? FloatAcc extends ""
    ? LexNumber<Rest, SignAcc, IntAcc, Token["value"]>
    : LexNumber<Rest, SignAcc, Token["value"], FloatAcc>
  : LexNumberReturn<T, SignAcc, IntAcc, FloatAcc>

type HandleIdentifier<
  T extends string,
  StrAcc extends string = ""
> = T extends `${infer Head extends Letters}${infer Rest}`
  ? HandleIdentifier<Rest, `${StrAcc}${Head}`>
  : StrAcc extends ""
  ? Error.Lexer
  : StrAcc extends "abs" | "ceil" | "floor" | "round" | "truncate"
  ? LexResult<T, Token.UnaryFunction<StrAcc>>
  : StrAcc extends "root"
  ? LexResult<T, Token.BinaryFunction<StrAcc>>
  : Error.Lexer

type HandleToken<T extends string> = T extends `${infer Head}${infer Rest}`
  ? Head extends "+"
    ? LexResult<Rest, Token.Plus>
    : Head extends "-"
    ? LexResult<Rest, Token.Minus>
    : Head extends "*"
    ? LexResult<Rest, Token.Multiply>
    : Head extends "/"
    ? LexResult<Rest, Token.Divide>
    : Head extends "("
    ? LexResult<Rest, Token.LeftBracket>
    : Head extends ")"
    ? LexResult<Rest, Token.RightBracket>
    : Head extends "!"
    ? LexResult<Rest, Token.Factorial>
    : Head extends "%"
    ? LexResult<Rest, Token.Modulo>
    : Head extends "^"
    ? LexResult<Rest, Token.Power>
    : Head extends ","
    ? LexResult<Rest, Token.Comma>
    : Error.Lexer
  : Error.Lexer

export type Lexer<
  T extends string,
  Result extends Token._[] = []
> = T extends `${infer S}${infer Rest}`
  ? S extends " "
    ? Lexer<Rest, Result>
    : LexNumber<T> extends LexResult<infer Rest, infer NewToken>
    ? Lexer<Rest, [...Result, NewToken]>
    : HandleIdentifier<T> extends LexResult<infer Rest, infer NewToken>
    ? Lexer<Rest, [...Result, NewToken]>
    : HandleToken<T> extends LexResult<infer Rest, infer NewToken>
    ? Lexer<Rest, [...Result, NewToken]>
    : never
  : Result
