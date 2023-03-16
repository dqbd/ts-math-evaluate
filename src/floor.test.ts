import { Floor } from "./floor"

// $ExpectType "123"
type FloorCase1 = Floor<"123.9333">

// $ExpectType "-124"
type FloorCase2 = Floor<"-123.9333">

// $ExpectType "-123"
type FloorCase3 = Floor<"-123">

// $ExpectType "0"
type FloorCase4 = Floor<"0">
