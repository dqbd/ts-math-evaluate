import { Abs } from "../src"

// $ExpectType "300"
type IntCase1 = Abs<"-300">

// $ExpectType "120"
type IntCase2 = Abs<"120">

// $ExpectType "120.1203"
type FloatCase2 = Abs<"120.1203">

// $ExpectType "120.1203"
type FloatCase3 = Abs<"-120.1203">
