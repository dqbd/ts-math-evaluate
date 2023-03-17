import { Divide } from "./div"

// $ExpectType "-132.0"
type DivideCase1 = Divide<"-264", "2">

// $ExpectType "132.5"
type DivideCase2 = Divide<"265", "2">

// $ExpectType "4.3333333333"
type DivideCase3 = Divide<"13", "3">
