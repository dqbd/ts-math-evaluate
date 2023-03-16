import { Sub } from "./sub"

// $ExpectType "2.123"
type SubFloatCase1 = Sub<"3.123", "1">

// $ExpectType "3.123"
type SubFloatCase2 = Sub<"3.123", "0">

// $ExpectType "0.802"
type SubFloatCase3 = Sub<"3.123", "2.321">

// $ExpectType "1299923992396.802"
type SubFloatCase4 = Sub<"1299923992399.123", "2.321">
