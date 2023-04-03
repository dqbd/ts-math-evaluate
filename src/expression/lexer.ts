/**
 * Lexer
 */
export type Token =
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

type Fail = "LexerFail"

type LexResult<Rest extends string, Result extends Token> = {
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
  ? Fail
  : LexResult<T, { type: "Number"; value: NumAcc }>
type LexNumberReturn<
  T extends string,
  SignAcc extends string = "",
  IntAcc extends string = "",
  FloatAcc extends string | null = null
> = FloatAcc extends null | ""
  ? IntAcc extends ""
    ? Fail
    : LexResult<T, { type: "Number"; value: `${SignAcc}${IntAcc}` }>
  : IntAcc extends ""
  ? LexResult<T, { type: "Number"; value: `${SignAcc}0.${FloatAcc}` }>
  : LexResult<T, { type: "Number"; value: `${SignAcc}${IntAcc}.${FloatAcc}` }>
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
  : LexDigits<T> extends LexResult<
      infer Rest,
      infer Token extends { type: "Number"; value: string }
    >
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
  ? Fail
  : LexResult<T, { type: "Identifier"; value: StrAcc }>
type HandleToken<T extends string> = T extends `${infer Head}${infer Rest}`
  ? Head extends "+"
    ? LexResult<Rest, { type: "Plus" }>
    : Head extends "-"
    ? LexResult<Rest, { type: "Minus" }>
    : Head extends "*"
    ? LexResult<Rest, { type: "Multiply" }>
    : Head extends "/"
    ? LexResult<Rest, { type: "Divide" }>
    : Head extends "("
    ? LexResult<Rest, { type: "LeftParenthesis" }>
    : Head extends ")"
    ? LexResult<Rest, { type: "RightParenthesis" }>
    : Head extends "!"
    ? LexResult<Rest, { type: "Factorial" }>
    : Head extends "%"
    ? LexResult<Rest, { type: "Modulo" }>
    : Head extends "^"
    ? LexResult<Rest, { type: "Power" }>
    : Fail
  : Fail

export type Lexer<
  T extends string,
  Result extends Token[] = []
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
