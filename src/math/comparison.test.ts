import { ParseFloatNumber, ParseSignFloatNumber } from "../utils/parse"
import { CompareAbsNumbers, CompareSignNumbers, IsEvenInt } from "./comparison"

// $ExpectType -1
type CompareAbsNumbersCase1 = CompareAbsNumbers<
  ParseFloatNumber<"123">,
  ParseFloatNumber<"456">
>

// $ExpectType 0
type CompareAbsNumbersCase2 = CompareAbsNumbers<
  ParseFloatNumber<"456">,
  ParseFloatNumber<"456">
>

// $ExpectType -1
type CompareAbsNumbersCase3 = CompareAbsNumbers<
  ParseFloatNumber<"0.123">,
  ParseFloatNumber<"456">
>

// $ExpectType 1
type CompareAbsNumbersCase4 = CompareAbsNumbers<
  ParseFloatNumber<"0.1234">,
  ParseFloatNumber<"0.123">
>

// $ExpectType -1
type CompareSignNumbersCase1 = CompareSignNumbers<
  ParseSignFloatNumber<"123">,
  ParseSignFloatNumber<"456">
>

// $ExpectType 0
type CompareSignNumbersCase2 = CompareSignNumbers<
  ParseSignFloatNumber<"456">,
  ParseSignFloatNumber<"456">
>

// $ExpectType 1
type CompareSignNumbersCase3 = CompareSignNumbers<
  ParseSignFloatNumber<"456">,
  ParseSignFloatNumber<"123">
>

// $ExpectType 1
type CompareSignNumbersCase4 = CompareSignNumbers<
  ParseSignFloatNumber<"123">,
  ParseSignFloatNumber<"-123">
>

// $ExpectType -1
type CompareSignNumbersCase5 = CompareSignNumbers<
  ParseSignFloatNumber<"-123">,
  ParseSignFloatNumber<"123">
>

// $ExpectType -1
type CompareSignNumbersCase6 = CompareSignNumbers<
  ParseSignFloatNumber<"-0">,
  ParseSignFloatNumber<"0">
>

// $ExpectType true
type IsEvenCase1 = IsEvenInt<[1, 2, 0]>

// $ExpectType false
type IsEvenCase2 = IsEvenInt<[1]>
