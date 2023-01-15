import { SubFrac } from "../src"

// $ExpectType "2.123"
type SubFloatCase1 = SubFrac<"3.123", "1">

// $ExpectType "3.123"
type SubFloatCase2 = SubFrac<"3.123", "0">

// $ExpectType "0.802"
type SubFloatCase3 = SubFrac<"3.123", "2.321">
