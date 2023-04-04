import { Negate } from "./negate"

// $ExpectType "300"
type IntCase1 = Negate<"-300">

// $ExpectType "-120"
type IntCase2 = Negate<"120">

// $ExpectType "-120.1203"
type FloatCase1 = Negate<"120.1203">

// $ExpectType "120.1203"
type FloatCase2 = Negate<"-120.1203">

// $ExpectType "9999999999999999999999999999999999999999999999999999999999999999.1203"
type FloatCase3 =
  Negate<"-9999999999999999999999999999999999999999999999999999999999999999.1203">
