import { Add } from "../src/add"

// $ExpectType "36"
type IntCase1 = Add<"0", "36">

// $ExpectType "46"
type IntCase2 = Add<"10", "36">

// $ExpectType "156"
type IntCase3 = Add<"120", "36">

// $ExpectType "7.046123"
type FloatCase1 = Add<"3.123", "3.923123">

// $ExpectType "7.123"
type FloatCase2 = Add<"3.123", "4">

// $ExpectType "3.123"
type FloatCase3 = Add<"3.123", "0">

// $ExpectType "12001.0"
type FloatCase4 = Add<"12000.0", "1">

// $ExpectType "12000000000001.0123"
type FloatCase5 = Add<"12000000000000.0123", "1">
