import {
  FloatNumber,
  ParseSignFloatNumber,
  SignFloatNumber,
  StringifyFloat,
  StringifySignFloat,
} from "./parse"

// $ExpectType SignFloatNumber<"+", FloatNumber<[1], [2, 3, 2, 4, 3]>>
type ParseCase1 = ParseSignFloatNumber<"1.23243">

// $ExpectType "3.12"
type StringifyCase1 = StringifyFloat<FloatNumber<[3], [1, 2]>>

// $ExpectType "3"
type StringifyCase2 = StringifyFloat<FloatNumber<[3], []>>

// $ExpectType "-3.12"
type StringifyFloatCase1 = StringifySignFloat<
  SignFloatNumber<"-", FloatNumber<[3], [1, 2]>>
>

// $ExpectType "3.12"
type StringifyFloatCase2 = StringifySignFloat<
  SignFloatNumber<"+", FloatNumber<[3], [1, 2]>>
>

// $ExpectType "-3"
type StringifyFloatCase3 = StringifySignFloat<
  SignFloatNumber<"-", FloatNumber<[3], []>>
>

// $ExpectType "3"
type StringifyFloatCase4 = StringifySignFloat<
  SignFloatNumber<"+", FloatNumber<[3], []>>
>
