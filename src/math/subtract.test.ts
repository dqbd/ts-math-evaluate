import { Subtract } from "./subtract"

// $ExpectType "2.123"
type SubFloatCase1 = Subtract<"3.123", "1">

// $ExpectType "3.123"
type SubFloatCase2 = Subtract<"3.123", "0">

// $ExpectType "0.802"
type SubFloatCase3 = Subtract<"3.123", "2.321">

// $ExpectType "1299923992396.802"
type SubFloatCase4 = Subtract<"1299923992399.123", "2.321">

// $ExpectType "5.444"
type SubFloatCase5 = Subtract<"3.123", "-2.321">

// $ExpectType "-5.444"
type SubFloatCase6 = Subtract<"-3.123", "2.321">

// $ExpectType "-2"
type SubFloatCase7 = Subtract<"3", "5">

// $ExpectType "-1"
type SubFloatCase8 = Subtract<"-9", "-8">

// $ExpectType "0"
type SubFloatCase9 = Subtract<"-9", "-9">

// $ExpectType "6"
type SubFloatCase10 = Subtract<"-3", "-9">
