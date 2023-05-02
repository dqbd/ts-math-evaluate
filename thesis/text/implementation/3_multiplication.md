# Multiplication

A naive implementation of the multiplication algorithm can be created by repeatably adding the multiplicand when numbers are represented by tuple length, as seen in Listing [\[lst:naive-multiplication\]](#lst:naive-multiplication). `Multiply` generic type has two mandatory type parameters: `A` and `B` representing the multiplicand and multiplier, respectively. The optional type parameter `Left` is used to track how many iterations are left before the recursion terminates. This method is considered ineffective, as the number of recursion calls is proportional to the size of the multiplicand, and the method can easily reach the instantiation depth limit with large multiplicands.

<div class="listing">

``` TypeScript
type Multiply<
  A extends number,
  B extends number,
  Left extends number = B
> = Left extends 0 ? 0 : Multiply<Add<A, B>, B, Subtract<B>>
```

</div>

Because of this reason, the library implements the long multiplication method instead. Similarly to the addition and subtraction algorithm, a two-dimensional lookup object type is used to obtain the resulting multiplication digit and the appropriate carry number. First, `MultiplyInt` will iterate on multiplier digits from right to left and multiply each digit with the multiplicand by invoking the `MultiplySingleInt` generic type. The result of each multiplication, appropriately offset with zeroes to account for the position of the digit in the multiplier, is then added together to obtain the final result. An example can be seen in Listing [\[lst:long-multiplication\]](#lst:long-multiplication).

<div class="listing">

``` TypeScript
type MultiplyInt<
  X extends Digit[],
  Y extends Digit[],
  Tmp extends { result: Digit[]; offset: Digit[] } = { result: [0]; offset: [] }
> = Y extends [...infer Rest extends Digit[], infer Single extends Digit]
  ? MultiplySingleInt<X, Single> extends infer SingleResult extends Digit[]
    ? AddInt<
        Tmp["result"],
        [...SingleResult, ...Tmp["offset"]]
      > extends infer Result extends Digit[]
      ? MultiplyInt<X, Rest, { result: Result; offset: [0, ...Tmp["offset"]] }>
      : never
    : never
  : Tmp["result"]
```

</div>

With the core building block for integer multiplication, extending the algorithm to floating-point numbers and signed numbers is straightforward.

The `MultiplyFloat` generic type, as seen in Listing [\[lst:float-multiplication\]](#lst:float-multiplication), converts the floating point number to an integer by concatenating the integer part of a number with the fractional part, preserving the precision, number of digits in the fractional part, as the length of a tuple. The precision is encoded as a tuple because the precision of the multiplication is the sum of the multiplicand and multiplier precisions. This can be done by spreading the tuples representing the precisions instead of calling expensive per-digit addition recursive types.

<div class="listing">

``` TypeScript
type ExpandIntFloat<X extends FloatNumber> = IntFloat<
  [...X["int"], ...X["frac"]],
  ExpandNumberToArray<X["frac"]["length"]>
>

type MultiplyFloat<
  X extends FloatNumber,
  Y extends FloatNumber
> = ExpandIntFloat<X> extends infer A extends IntFloat
  ? ExpandIntFloat<Y> extends infer B extends IntFloat
    ? CompressIntFloat<
        IntFloat<
          MultiplyInt<A["mantissa"], B["mantissa"]>,
          [...A["precision"], ...B["precision"]]
        >
      >
    : never
  : never
```

</div>

The result of the integer multiplication is then converted back to a floating-point number by shifting the integer part right, as seen in Listing [\[lst:integer-to-float\]](#lst:integer-to-float). This is done by iteratively taking the elements from the tuple representing the precision, acting as a counter, and prepending the rightmost digit of the integer part to the fractional part. The recursion terminates when the precision tuple is empty.

<div class="listing">

``` TypeScript
type Compress<
  Count extends Array<0>,
  Left extends Digit[],
  Right extends Digit[] = []
> = Count extends [0, ...infer RestCount extends 0[]]
  ? Left extends [...infer LeftRest extends Digit[], infer End extends Digit]
    ? Compress<RestCount, LeftRest, [End, ...Right]>
    : Compress<RestCount, Left, [0, ...Right]>
  : [Left, Right]
```

</div>
