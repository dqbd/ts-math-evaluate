import { Lexer } from "./lexer"
import { RecursiveParser } from "./parser"

export type ParserCase1 = RecursiveParser.Parse<
  Lexer<"3.1 + 2.5 * (1 - 5.6) / 4.2">
>
