import { Lexer } from "./lexer"
import { RecursiveParser } from "./parser"

// $ExpectType Binary<Number<"3.1">, "+", Binary<Binary<Number<"2.5">, "*", Binary<Number<"1">, "-", Number<"5.6">>>, "/", Number<"4.2">>>
export type ParserCase1 = RecursiveParser.Parse<
  Lexer.Parse<"3.1 + 2.5 * (1 - 5.6) / 4.2">
>

// $ExpectType Unary<"abs", Number<"-2">>
export type ParserCase2 = RecursiveParser.Parse<Lexer.Parse<"abs(-2)">>

// $ExpectType Unary<"floor", Binary<Number<"4">, "root", Number<"2">>>
export type ParserCase3 = RecursiveParser.Parse<
  Lexer.Parse<"floor(root(4, 2))">
>
