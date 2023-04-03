import { Parser } from "./parser"
import { Lexer } from "./lexer"
import { Evaluate } from "./evaluator"

// $ExpectType "0.36190476200"
type EvaluateCase1 = Evaluate<Parser<Lexer<"3.1 + 2.5 * (1 - 5.6) / 4.2">>>

// $ExpectType "-32"
type EvaluateCase2 = Evaluate<Parser<Lexer<"-64 + 10 * 0 + 32">>>
