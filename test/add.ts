import { Add } from "../src"

// $ExpectType "36"
type IntCase1 = Add<"0", "36">

// $ExpectType "46"
type IntCase2 = Add<"10", "36">

// $ExpectType "156"
type IntCase3 = Add<"120", "36">
