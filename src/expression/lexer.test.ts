import { Lexer } from "./lexer"

// $ExpectType []
type LexerCase1 = Lexer.Parse<"">

// $ExpectType [BinaryFunction<"root">]
type LexerCase2 = Lexer.Parse<"root">

// $ExpectType [Number<"100">]
type LexerCase3 = Lexer.Parse<"100">

// $ExpectType [Factorial]
type LexerCase4 = Lexer.Parse<"!">

// $ExpectType [Plus]
type LexerCase5 = Lexer.Parse<"+">

// $ExpectType [Minus]
type LexerCase6 = Lexer.Parse<"-">

// $ExpectType [Multiply]
type LexerCase7 = Lexer.Parse<"*">

// $ExpectType [Divide]
type LexerCase8 = Lexer.Parse<"/">

// $ExpectType [Modulo]
type LexerCase9 = Lexer.Parse<"%">

// $ExpectType [Power]
type LexerCase10 = Lexer.Parse<"^">

// $ExpectType [UnaryFunction<"ceil">, LeftBracket, RightBracket]
type LexerCase11 = Lexer.Parse<"ceil()">

// $ExpectType [Number<"-123.32">]
type LexerCase12 = Lexer.Parse<"-123.32">

// $ExpectType never
type LexerCase13 = Lexer.Parse<".">

// $ExpectType [Number<"-123">]
type LexerCase14 = Lexer.Parse<"-123.">

// $ExpectType [Number<"+0.123">]
type LexerCase15 = Lexer.Parse<"+.123">

// $ExpectType [UnaryFunction<"abs">, LeftBracket, BinaryFunction<"root">, LeftBracket, Number<"2">, Comma, Number<"4">, RightBracket, RightBracket]
type LexerCase16 = Lexer.Parse<"abs(root(2, 4))">
