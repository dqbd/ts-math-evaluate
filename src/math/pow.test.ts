import { Pow } from "./pow"

type PowCase1 = Pow<"2", "3"> // $ExpectType "8"

type PowCase2 = Pow<"2", "-3"> // $ExpectType "0.125"

type PowCase3 = Pow<"2", "0"> // $ExpectType "1"

type PowCase4 = Pow<"2", "1"> // $ExpectType "2"

type PowCase5 = Pow<"2.5", "3"> // $ExpectType "15.625"
