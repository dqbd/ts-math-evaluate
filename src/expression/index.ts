import { RecursiveParser } from "./parser"
import { Lexer } from "./lexer"
import { Evaluator } from "./evaluator"

export type Evaluate<T extends string> = Lexer.Parse<T> extends infer Tokens
  ? RecursiveParser.Parse<Tokens> extends infer AST
    ? Evaluator.Evaluate<AST> extends infer Result
      ? Result
      : never
    : never
  : never
