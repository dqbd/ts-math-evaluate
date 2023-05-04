import { Divide } from "./divide"

// $ExpectType "-132.0"
type DivideCase1 = Divide<"-264", "2">

// $ExpectType "132.5"
type DivideCase2 = Divide<"265", "2">

// $ExpectType "4.3333333333"
type DivideCase3 = Divide<"13", "3">

// $ExpectType "14.0"
type DivideCase4 = Divide<"7", "0.5">

// $ExpectType "-32.0"
type DivideCase5 = Divide<"16", "-0.5">

// $ExpectType "-0.0"
type DivideCase6 = Divide<"0", "-0.5">

// $ExpectType never
type DivideCase7 = Divide<"0", "0">

// $ExpectType never
type DivideCase8 = Divide<"120", "0">

// $ExpectType never
type DivideCase9 = Divide<"120", "0.0">

