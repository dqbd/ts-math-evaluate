import { Add, AddFrac } from "../src"

// $ExpectType "36"
type IntCase1 = Add<"0", "36">

// $ExpectType "46"
type IntCase2 = Add<"10", "36">

// $ExpectType "156"
type IntCase3 = Add<"120", "36">

// $ExpectType "7.046123"
type IntCase4 = AddFrac<3.123, 3.923123>
