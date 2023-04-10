import { Lexer } from "./lexer"
import { RecursiveParser } from "./parser"

// $ExpectType BinaryType<NumberType<"3.1">, "+", BinaryType<BinaryType<NumberType<"2.5">, "*", BinaryType<NumberType<"1">, "-", NumberType<"5.6">>>, "/", NumberType<"4.2">>>
export type ParserCase1 = RecursiveParser.Parse<
  Lexer<"3.1 + 2.5 * (1 - 5.6) / 4.2">
>

// $ExpectType UnaryType<"abs", NumberType<"-2">>
export type ParserCase2 = RecursiveParser.Parse<Lexer<"abs(-2)">>

// $ExpectType UnaryType<"floor", BinaryType<NumberType<"4">, "root", NumberType<"2">>>
export type ParserCase3 = RecursiveParser.Parse<Lexer<"floor(root(4, 2))">>
