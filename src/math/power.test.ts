import { Power } from "./power"

type PowCase1 = Power<"2", "3"> // $ExpectType "8"

type PowCase2 = Power<"2", "-3"> // $ExpectType "0.125"

type PowCase3 = Power<"2", "0"> // $ExpectType "1"

type PowCase4 = Power<"2", "1"> // $ExpectType "2"

type PowCase5 = Power<"2.5", "3"> // $ExpectType "15.625"
