import { Ceil } from "./ceil"

// $ExpectType "1"
type CeilCase1 = Ceil<"0.1">

// $ExpectType "1"
type CeilCase2 = Ceil<"0.9">

// $ExpectType "0"
type CeilCase3 = Ceil<"0">

// $ExpectType "-1"
type CeilCase4 = Ceil<"-1.9">

// $ExpectType "-1"
type CeilCase5 = Ceil<"-1">
