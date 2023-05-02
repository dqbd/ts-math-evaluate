# Division and modulo

The implementation of the division algorithm is split into two main
parts: the Euclidean division and the long division algorithm. Given two
integers, a dividend $x$ and a divisor $y$, the Euclidean division aims
to find a quotient $q$ and a remainder $r$, which satisfies the
following equation [\[eq:euclidean-division\]](#eq:euclidean-division):

$$\label{eq:euclidean-division}
  x = y\cdot q + r \qquad \text{if } 0 \le r < |b|$$

The Euclidean algorithm finds the quotient and the remainder using
repeated subtraction as seen in
[\[lst:euclidean-division\]](#lst:euclidean-division). The
`DivisionResult` contains both the temporary quotient and remainder
values passed to the next iteration. The `EuclideanDivision` generic
type first checks if the remainder is greater than or equal to the
divisor. If that is the case, the quotient is incremented by one using
`AddInt` generic type and the remainder is subtracted by the divisor
using `SubDigit`. The process is repeated until the remainder is less
than the divisor, at which point the computed quotient and remainder are
returned.

<div class="listing">

``` TypeScript
interface DivisionResult<
  Quotient extends Digit[] = Digit[],
  Remainder extends Digit[] = Digit[]
> { quotient: Quotient; remainder: Remainder }

type EuclideanDivision<
  Dividend extends Digit[],
  Divisor extends Digit[],
  Tmp extends DivisionResult = DivisionResult<[0], Dividend>
> = CompareDigits<Tmp["remainder"], Divisor> extends 1 | 0
  ? EuclideanDivision<
      Dividend,
      Divisor,
      DivisionResult<
        AddInt<Tmp["quotient"], [1]>,
        SubDigit<Tmp["remainder"], Divisor>
      >
    >
  : DivisionResult<TrimStart<Tmp["quotient"]>, TrimStart<Tmp["remainder"]>>
```

</div>

The long division algorithm, seen in
[\[lst:long-division\]](#lst:long-division) as `LongDivisionDigit`
generic type, implemented in this thesis builds upon the foundation of
the Euclidean division. In each iteration, the leftmost digit is popped
from the dividend and pushed to the end of the accumulated remainder.
Subsequently, pass the newly created tuple as the remainder for the
Euclidean division, together with the divisor. The next invocation of
`LongDivisionDigit` takes the resulting dividend, the divisor and the
updated accumulator of `DivisionResult` type. The updated
`DivisionResult` instance has the remainder copied and the quotient
concatenated from the result of the Euclidean division. The process is
repeated until all digits in the dividend have been used. Finally, the
quotient and remainder are returned, with the leading zeros removed.

<div class="listing">

``` TypeScript
type LongDivisionDigit<
  Dividend extends Digit[],
  Divisor extends Digit[],
  Acc extends DivisionResult = DivisionResult<[], []>
> = Dividend extends [
  infer Head extends Digit,
  ...infer RestDividend extends Digit[]
]
  ? EuclideanDivision<
      [...Acc["remainder"], Head],
      Divisor
    > extends infer IntDivision extends DivisionResult
    ? LongDivisionDigit<
        RestDividend,
        Divisor,
        DivisionResult<
          [...Acc["quotient"], ...IntDivision["quotient"]],
          IntDivision["remainder"]
        >
      >
    : never
  : DivisionResult<TrimStart<Tmp["quotient"]>, TrimStart<Tmp["remainder"]>>
```

</div>

When conducting division operations involving two numbers with
fractional components, the digit tuples of fractional parts are padded
with zeroes to ensure equal lengths for both tuples. Afterwards, the
fractional part is concatenated behind the integer part, creating an
integer number compatible with the long division algorithm. Further
digit shifting is not necessary, as the orders of magnitude get
cancelled out during the division process, and the division itself will
return a `FloatNumber`. An example of how the numbers are processed can
be seen in
[\[fig:long-division-preprocessing\]](#fig:long-division-preprocessing):

$$\label{fig:long-division-preprocessing}
  \begin{array}{r@{\quad=\quad}r@{\quad=\quad}l}
    123.456             & 123.456               & 123456 \times 10^{-3}                                                   \\
    2.5                 & 2.500                 & 2500 \times 10^{-3}                                                     \\
    \frac{123.456}{2.5} & \frac{123.456}{2.500} & \frac{123456 \times 10^{-3}}{2500 \times 10^{-3}} = \frac{123456}{2500}
  \end{array}$$

Since both the long division and Euclidean division algorithms exhibit
greater complexity and are prone to deep recursion, it is likely that
when used, the instantiation depth limit imposed by TypeScript will be
exceeded. As a workaround, it is possible to defer the evaluation of a
type by rephrasing it as a distributive conditional type. This
workaround will be remarkably useful when multiple complex arithmetic
operations are chained together, as the $n$-th root operation will
exemplify.

Modulo operation builds on top of the division, multiplication and
subtraction algorithm by calculating the floor of the division result
obtained when dividing the dividend by the divisor. Subsequently, the
result is multiplied by the divisor and finally subtracted from the
dividend to obtain the final result of the modulo operation.
