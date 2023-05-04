import { Root } from "./root"

// $ExpectType "2.236067977403125"
type RootCase1 = Root<"5", "2">

// $ExpectType "1.4142135623375"
type RootCase2 = Root<"2", "2">

// $ExpectType "34.683725587009375"
type RootCase3 = Root<"1200", "2">

// $ExpectType never
type RootCase4 = Root<"1200", "-3">

// $ExpectType never
type RootCase5 = Root<"1200", "2.3">

// $ExpectType never
type RootCase6 = Root<"1200", "0">

// $ExpectType "1200.0"
type RootCase7 = Root<"1200", "1">
