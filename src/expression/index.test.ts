import { Evaluate } from "."

// $ExpectType "2.361904762"
type ExpressionCase1 =
  Evaluate<"3.1 + 2.5 * (1 - 5.6) / 4.2 + truncate(root(4, 2))! * -floor(1.5) + abs(-1) + ceil(root(4, 2))">

// $ExpectType "-32"
type ExpressionCase2 = Evaluate<"-64 + 10 * 0 + 32">

// $ExpectType "17"
type ExpressionCase3 = Evaluate<"4 % 3 + 2^4">

// $ExpectType "2"
type ExpressionCase4 = Evaluate<"ceil(root(4, 2))">

// $ExpectType "0"
type ExpressionCase5 = Evaluate<"truncate(root(4, 2))! * -floor(1.5) + abs(-1)">
