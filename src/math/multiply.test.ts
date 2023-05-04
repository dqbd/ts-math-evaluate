import { Multiply } from "./multiply"

// $ExpectType "123"
type MultiplyCase1 = Multiply<"123", "1">

// $ExpectType "1107"
type MultiplyCase2 = Multiply<"123", "9">

// $ExpectType "1111.5"
type MultiplyCase3 = Multiply<"123.5", "9">

// $ExpectType "0.0"
type MultiplyCase4 = Multiply<"1.5", "0">
