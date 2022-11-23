import { Neg } from "../src"

// $ExpectType "300"
type IntCase1 = Neg<"-300">

// $ExpectType "-120"
type IntCase2 = Neg<"120">

// $ExpectType "-120.1203"
type FloatCase1 = Neg<"120.1203">

// $ExpectType "120.1203"
type FloatCase2 = Neg<"-120.1203">
