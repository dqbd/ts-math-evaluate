import { Lexer } from "./lexer";
import { Parser } from "./parser";

export type ParserCase1 = Parser<Lexer<"3.1 + 2.5 * (1 - 5.6) / 4.2">>