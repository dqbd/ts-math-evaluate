import { Lexer } from "./lexer"

// $ExpectType []
type LexerCase1 = Lexer<"">

// $ExpectType [{ type: "Identifier"; value: "qwertyuiopasdfghjklzxcvbnm"; }]
type LexerCase2 = Lexer<"qwertyuiopasdfghjklzxcvbnm">

// $ExpectType [{ type: "Number"; value: "100"; }]
type LexerCase3 = Lexer<"100">

// $ExpectType [{ type: "Factorial"; }]
type LexerCase4 = Lexer<"!">

// $ExpectType [{ type: "Plus"; }]
type LexerCase5 = Lexer<"+">

// $ExpectType [{ type: "Minus"; }]
type LexerCase6 = Lexer<"-">

// $ExpectType [{ type: "Multiply"; }]
type LexerCase7 = Lexer<"*">

// $ExpectType [{ type: "Divide"; }]
type LexerCase8 = Lexer<"/">

// $ExpectType [{ type: "Modulo"; }]
type LexerCase9 = Lexer<"%">

// $ExpectType [{ type: "Power"; }]
type LexerCase10 = Lexer<"^">

// $ExpectType [{ type: "Identifier"; value: "sign"; }, { type: "LeftParenthesis"; }, { type: "RightParenthesis"; }]
type LexerCase11 = Lexer<"sign()">

// $ExpectType [{ type: "Number"; value: "-123.32"; }]
type LexerCase12 = Lexer<"-123.32">

// $ExpectType never
type LexerCase13 = Lexer<".">

// $ExpectType [{ type: "Number"; value: "-123"; }]
type LexerCase14 = Lexer<"-123.">

// $ExpectType [{ type: "Number"; value: "+0.123"; }]
type LexerCase15 = Lexer<"+.123">
