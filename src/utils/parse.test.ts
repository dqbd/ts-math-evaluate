import { StringifyFloat } from "./parse"

// $ExpectType "3.12"
type StringifyCase1 = StringifyFloat<{ int: "3"; frac: "12" }>

// $ExpectType "-3.12"
type StringifyCase2 = StringifyFloat<{ sign: "-"; int: "3"; frac: "12" }>

// $ExpectType "-3"
type StringifyCase3 = StringifyFloat<{ sign: "-"; int: "3"; frac: "" }>
