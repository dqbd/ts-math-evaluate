import { Round } from "./round"

// $ExpectType "124"
type RoundCase1 = Round<"123.9333">

// $ExpectType "123"
type RoundCase2 = Round<"123.3333">

// $ExpectType "123"
type RoundCase3 = Round<"123">

// $ExpectType "-2"
type RoundCase4 = Round<"-1.9">

// $ExpectType "-1"
type RoundCase5 = Round<"-1.4">

// $ExpectType "-2"
type RoundCase6 = Round<"-1.5">

// $ExpectType "-1"
type RoundCase7 = Round<"-1">

// $ExpectType "-0"
type RoundCase8 = Round<"-0.1">

// $ExpectType "0"
type RoundCase9 = Round<"0.1">
