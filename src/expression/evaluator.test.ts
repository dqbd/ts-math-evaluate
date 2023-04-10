import { RecursiveParser } from "./parser"
import { Lexer } from "./lexer"
import { Evaluate } from "./evaluator"

// $ExpectType "0.3619047620"
type EvaluateCase1 = Evaluate<
  RecursiveParser.Parse<Lexer<"3.1 + 2.5 * (1 - 5.6) / 4.2">>
>

// $ExpectType "-32"
type EvaluateCase2 = Evaluate<RecursiveParser.Parse<Lexer<"-64 + 10 * 0 + 32">>>

// $ExpectType "17"
type EvaluateCase3 = Evaluate<RecursiveParser.Parse<Lexer<"4 % 3 + 2^4">>>

// $ExpectType "2"
type EvaluateCase4 = Evaluate<RecursiveParser.Parse<Lexer<"ceil(root(4, 2))">>>

// $ExpectType "0"
type EvaluateCase5 = Evaluate<
  RecursiveParser.Parse<Lexer<"truncate(root(4, 2))! * -floor(1.5) + abs(-1)">>
>
