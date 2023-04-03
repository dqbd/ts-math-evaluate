import { Factorial } from "./factorial"

// $ExpectType "1"
type FactorialCase1 = Factorial<0>
// $ExpectType "2"
type FactorialCase2 = Factorial<2>
// $ExpectType "24"
type FactorialCase3 = Factorial<4>
