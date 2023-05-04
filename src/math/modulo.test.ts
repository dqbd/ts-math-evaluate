import { Modulo } from "./modulo"

// $ExpectType "1"
type ModCase1 = Modulo<"4", "3">

// $ExpectType "0"
type ModCase2 = Modulo<"6", "2">

// $ExpectType "2"
type ModCase3 = Modulo<"5", "3">

// $ExpectType "0"
type ModCase4 = Modulo<"0", "5">

// $ExpectType "0"
type ModCase5 = Modulo<"10", "1">

// $ExpectType "3"
type ModCase6 = Modulo<"999", "4">

// $ExpectType "0"
type ModCase7 = Modulo<"1000", "10">

// $ExpectType "3.2"
type ModCase8 = Modulo<"3.2", "4">

// $ExpectType never
type ModCase9 = Modulo<"0", "0">

// $ExpectType "-1.5"
type ModCase10 = Modulo<"4.5", "-2">

// $ExpectType "-0.5"
type ModCase11 = Modulo<"-4.5", "-2">