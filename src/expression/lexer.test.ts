import { Lexer } from "./lexer"

// $ExpectType []
type LexerCase1 = Lexer<"">

// $ExpectType [BinaryFunction<"root">]
type LexerCase2 = Lexer<"root">

// $ExpectType [Number<"100">]
type LexerCase3 = Lexer<"100">

// $ExpectType [Factorial]
type LexerCase4 = Lexer<"!">

// $ExpectType [Plus]
type LexerCase5 = Lexer<"+">

// $ExpectType [Minus]
type LexerCase6 = Lexer<"-">

// $ExpectType [Multiply]
type LexerCase7 = Lexer<"*">

// $ExpectType [Divide]
type LexerCase8 = Lexer<"/">

// $ExpectType [Modulo]
type LexerCase9 = Lexer<"%">

// $ExpectType [Power]
type LexerCase10 = Lexer<"^">

// $ExpectType [UnaryFunction<"ceil">, LeftBracket, RightBracket]
type LexerCase11 = Lexer<"ceil()">

// $ExpectType [Number<"-123.32">]
type LexerCase12 = Lexer<"-123.32">

// $ExpectType never
type LexerCase13 = Lexer<".">

// $ExpectType [Number<"-123">]
type LexerCase14 = Lexer<"-123.">

// $ExpectType [Number<"+0.123">]
type LexerCase15 = Lexer<"+.123">
