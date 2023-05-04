import { RecursiveParser } from "./parser"
import { Lexer } from "./lexer"
import { Evaluator } from "./evaluator"

// $ExpectType "0.361904762"
type EvaluateCase1 = Evaluator.Evaluate<
  RecursiveParser.Parse<Lexer.Parse<"3.1 + 2.5 * (1 - 5.6) / 4.2">>
>

// $ExpectType "-32"
type EvaluateCase2 = Evaluator.Evaluate<
  RecursiveParser.Parse<Lexer.Parse<"-64 + 10 * 0 + 32">>
>

// $ExpectType "17"
type EvaluateCase3 = Evaluator.Evaluate<
  RecursiveParser.Parse<Lexer.Parse<"4 % 3 + 2^4">>
>

// $ExpectType "2"
type EvaluateCase4 = Evaluator.Evaluate<
  RecursiveParser.Parse<Lexer.Parse<"ceil(root(4, 2))">>
>

// $ExpectType "0"
type EvaluateCase5 = Evaluator.Evaluate<
  RecursiveParser.Parse<
    Lexer.Parse<"truncate(root(4, 2))! * -floor(1.5) + abs(-1)">
  >
>
