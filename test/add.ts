import { Add, AddFrac } from "../src"

// $ExpectType "36"
type IntCase1 = Add<"0", "36">

// $ExpectType "46"
type IntCase2 = Add<"10", "36">

// $ExpectType "156"
type IntCase3 = Add<"120", "36">

// $ExpectType "7.046123"
type FloatCase1 = AddFrac<"3.123", "3.923123">

// $ExpectType "7.123"
type FloatCase2 = AddFrac<"3.123", "4">

// $ExpectType "3.123"
type FloatCase3 = AddFrac<"3.123", "0">


