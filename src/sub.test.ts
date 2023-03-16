import { Sub } from "./sub"

// $ExpectType "2.123"
type SubFloatCase1 = Sub<"3.123", "1">

// $ExpectType "3.123"
type SubFloatCase2 = Sub<"3.123", "0">

// $ExpectType "0.802"
type SubFloatCase3 = Sub<"3.123", "2.321">

// $ExpectType "1299923992396.802"
type SubFloatCase4 = Sub<"1299923992399.123", "2.321">

// $ExpectType "5.444"
type SubFloatCase5 = Sub<"3.123", "-2.321">

// $ExpectType "-5.444"
type SubFloatCase6 = Sub<"-3.123", "2.321">

// $ExpectType "-2"
type SubFloatCase7 = Sub<"3", "5">

// $ExpectType "-1"
type SubFloatCase8 = Sub<"-9", "-8">

// $ExpectType "0"
type SubFloatCase9 = Sub<"-9", "-9">

// $ExpectType "6"
type SubFloatCase10 = Sub<"-3", "-9">
