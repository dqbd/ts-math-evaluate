import { Root } from "./root"

// $ExpectType "2.236067977403125"
type RootCase1 = Root<"5", "2">

// $ExpectType "1.414213562337500"
type RootCase2 = Root<"2", "2">
