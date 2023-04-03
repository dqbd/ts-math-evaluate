import { Lexer } from "./statement"

// $ExpectType []
type LexerCase1 = Lexer<"">

// $ExpectType [{ type: "Identifier"; value: "qwertyuiopasdfghjklzxcvbnm"; }, { type: "LeftParenthesis"; }, { type: "Number"; value: "100"; }, { type: "Factorial"; }, { type: "Plus"; }, { type: "Minus"; }, { type: "Multiply"; }, { type: "Divide"; }, { type: "Modulo"; }, { type: "Power"; }, { type: "Identifier"; value: "sign"; }, { type: "LeftParenthesis"; }, { type: "RightParenthesis"; }, { type: "RightParenthesis"; }]
type LexerCase2 = Lexer<"qwertyuiopasdfghjklzxcvbnm(100!+-*/%^sign())">

// $ExpectType [{ type: "Number"; value: "-123.32"; }]
type LexerCase3 = Lexer<"-123.32">