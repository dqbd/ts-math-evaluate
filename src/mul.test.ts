import { Multiply } from "./mul"

// $ExpectType "123"
type MultiplyCase1 = Multiply<"123", "1">
// $ExpectType "1107"
type MultiplyCase2 = Multiply<"123", "9">
