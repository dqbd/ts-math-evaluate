import { RecursiveParser } from "./parser"
import { Lexer } from "./lexer"
import { Evaluator } from "./evaluator"

/**
 * Evaluate an expression
 * @param T Expression to evaluate
 *
 * ```
 * type Example = Evaluate<"3.1 + 2.5 * (1 - 5.6) / 4.2 + truncate(root(4, 2))! * -floor(1.5) + abs(-1) + ceil(root(4, 2))">
 * ```
 */
export type Evaluate<T extends string> = Lexer.Parse<T> extends infer Tokens
  ? RecursiveParser.Parse<Tokens> extends infer AST
    ? Evaluator.Evaluate<AST> extends infer Result
      ? Result
      : never
    : never
  : never
