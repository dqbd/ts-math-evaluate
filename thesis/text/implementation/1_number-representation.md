# Type representation of numbers

As powerful as the type system in TypeScripts, there are certain
limitations that need to be addressed when working with literal
numerical types. Namely, although TypeScript type syntax includes
literal number types, useful for representing specific numeric values,
these types do not directly support mathematical operations, such as
addition or subtraction. Due to these limitations, other methods of
representing numbers are explored in this thesis.

One approach to representing numbers in TypeScript is to use tuples
types. As described in
[\[sec:typescript-data-structures\]](#sec:typescript-data-structures),
tuple types allow developers to describe a fixed-length JavaScript array
where each element can have a specific type. As it represents a
JavaScript array, the type includes all of the properties and methods
found in an array, including `length` property, which contains the
actual number of elements in the tuple. This feature can be used to
represent a number, as the length of the tuple can represent the number
itself, as seen in Listing
[\[lst:tuple-representation\]](#lst:tuple-representation). The actual
type of a member item in a tuple is irrelevant, as the type system only
cares about the length of the tuple, but for clarity purposes, the
literal type `0` can be used as the element type of a tuple.

<div class="listing">

``` TypeScript
type Zero = []
type Four = [0, 0, 0, 0] 

// $ExpectType 0
type ZeroValue = Zero['length']

// $ExpectType 4
type ZeroValue = Four['length']
```

</div>

However, manually describing a tuple is tedious. Recursion can be
employed to parse a literal number type to a tuple type, as seen in
[\[lst:tuple-parse\]](#lst:tuple-parse). The `ParseNumber<Value>`
generic type accepts a mandatory type argument `Value` that should be
the length of the final tuple and an optional type argument `Acc` used
to preserve the state of the recursion.

First, a check is performed to see if the length of `Acc` is equal to
the `Value` by checking the assignability of types. If that is the case,
the tuple type found in `Acc` is returned. Otherwise, the list is
extended with a new `0` element being prepended, and the function is
called recursively. The function is called recursively until the length
of `Acc` is assignable to `Value`.

<div class="listing">

``` TypeScript
type ParseNumber<
  Value extends number,
  Acc extends Array<0> = []
> = Acc["length"] extends Value ? Acc : ParseNumber<Value, [0, ...Acc]>
```

</div>

It is possible to improve the number of recursions to create a tuple by
expanding by a whole digit instead of by single increments. As seen in
Listing [\[lst:tuple-parse-digit\]](#lst:tuple-parse-digit), where
`ParsedNumber2` will first perform stringification of the literal number
type `T` and infer the first digit recursively. The accumulator type
parameter `Rest` is first expanded ten times by the
`ExpandArrayTenTimes` generic type, and then the parsed digit is spread
into `Rest` as well. The recursion is performed until the stringified
number is empty and the final `Rest` type is returned.

<div class="listing">

``` TypeScript

type ExpandArrayTenTimes<R extends Array<0>> = [
  ...R, ...R, ...R, ...R, ...R,
  ...R, ...R, ...R, ...R, ...R
]
    
type ParseNumber2<
  T extends number,
  Rest extends Array<0> = []
> = `${T}` extends `${infer Digit extends number}${infer R}`
  ? ParseNumber2<R, [...ExpandArrayTenTimes<Rest>, ...ParseNumber<Digit>]>
  : Rest
```

</div>

Even though this method of representing numbers is reasonably simple, it
does come at a performance cost, as the tuple must contain the number of
elements equal to the number itself. As such, the checking time of the
addition and subtraction operations grows as the number grows. This
issue alone poses a significant problem, primarily when representing
large numbers, as TypeScript has an upper limit on the number of
elements in a tuple to avoid performance degradation. As of writing, the
limit is set to 10 000 elements[@ImplementationCheckerTs2023], which is
only enough for representing integer numbers no greater than 10 000.

Another approach is to represent each digit of a number type into a
tuple. This approach does avoid the limitation of the tuple size imposed
by TypeScript, as it is now possible to represent much larger numbers
whilst reducing the performance overhead as the checking time can be
reduced for some operations, which work on individual digits. The number
type is parsed into object types beforehand to improve the developer
experience when implementing arithmetic operations, keeping the sign,
the integer and the fractional parts of a decimal representation number
separate. An example can be seen in Listing
[\[lst:object-representation\]](#lst:object-representation), where two
object types are created: `FloatNumber`, representing a number with both
integer and fractional digits, and `SignFloatNumber`, which is used to
provide number sign of an existing parsed number.

<div class="listing">

``` TypeScript
type Sign = "+" | "-"
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type FloatNumber<
  IntDigits extends Digit[] = Digit[],
  FracDigits extends Digit[] = Digit[]
> = {
  int: IntDigits
  frac: FracDigits
}

type SignFloatNumber<
  Sign extends "+" | "-" = "+" | "-",
  Float extends FloatNumber<Digit[], Digit[]> = FloatNumber
> = {
  sign: Sign
  float: Float
}
```

</div>

Parsing a number type into digits can be done by recursive types, as
seen in Listing [\[lst:object-parse\]](#lst:object-parse). First,
`ParseSignFloatNumber` attempts to infer the sign of the stringified
number literal type into a new `TSign` type. Afterwards,
`ParseFloatNumber` generic type attempts to split the stringified
literal into an integer and a fractional part. Both parts are later
parsed separately in `ParseNumber`, matching if each string contains
only digits.

<div class="listing">

``` TypeScript
type ParseNumber<S extends string> =
  S extends `${infer TInt extends Digit}${infer Rest}`
    ? [TInt, ...ParseNumber<Rest>]
    : []

type ParseFloatNumber<S extends NumberLike> =
  `${S}` extends `${infer Int}.${infer Frac}`
    ? FloatNumber<ParseNumber<Int>, ParseNumber<Frac>>
    : FloatNumber<ParseNumber<`${S}`>, []>

type ParseSignFloatNumber<T extends NumberLike> =
  `${T}` extends `${infer TSign extends Sign}${infer Rest}`
    ? SignFloatNumber<TSign, ParseFloatNumber<Rest>>
    : SignFloatNumber<"+", ParseFloatNumber<T>>
```

</div>

The formatting of the object representation of a number is implemented
in a similar fashion, where a digit is concatenated with a string-type
accumulator, as seen in a short code snippet in Listing
[\[lst:object-type-stringify\]](#lst:object-type-stringify).

<div class="listing">

``` TypeScript
type JoinDigit<T extends number[]> = T extends [
  infer A extends number,
  ...infer R extends number[]
]
  ? `${A}${JoinDigit<R>}`
  : ""
```

</div>