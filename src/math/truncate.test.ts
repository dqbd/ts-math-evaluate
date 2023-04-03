import { Truncate } from "./truncate"

// $ExpectType "1"
export type TruncateCase1 = Truncate<"1.2">

// $ExpectType "1"
export type TruncateCase2 = Truncate<"1.00000000000002">

// $ExpectType "-19999999991"
export type TruncateCase3 = Truncate<"-19999999991.00000000000002">
