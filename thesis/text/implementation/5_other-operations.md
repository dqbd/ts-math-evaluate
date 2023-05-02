# Other operations

## Comparison

Some operations require an additional type-level operation for comparing two numbers, such as the Euclidean division, for deciding whether to continue recursion. For that purpose, a type-level three-way comparison operator has been implemented, also known as the "spaceship operator" in the C++ programming language [@sutterConsistentComparison2017].

The spaceship operator for comparing two numbers $x$ and $y$, denoted by $x <=> y$, is defined in equation [\[eq:spaceship-operator\]](#eq:spaceship-operator) as follows:

$$\label{eq:spaceship-operator}
  x <=> y =
  \begin{cases}
    -1 & \text{if } x < y \\
    0  & \text{if } x = y \\
    1  & \text{if } x > y
  \end{cases}$$

It is possible to implement the operator entirely within the TypeScript type system by decomposing each number into a tuple of elements, where the size of the tuple is equal to the number itself. As seen in Listing [\[lst:type-level-comparison\]](#lst:type-level-comparison), the `CompareTuples` attempts to remove the first element of both tuples until one or both of the tuples are empty. The generic type returns the appropriate value depending on which tuple is empty first.

<div class="listing">

``` TypeScript
type CompareTuples<X extends Array<0>, Y extends Array<0>> =
  X extends [0, ...infer XRest extends Array<0>]
  ? Y extends [0, ...infer YRest extends Array<0>]
  ? CompareTuples<XRest, YRest>
  : 1
  : Y extends [0, ...Array<0>]
  ? -1
  : 0

type Compare<X extends number, Y extends number> =
  CompareTuples<ParseNumber<X>, ParseNumber<Y>>
```

</div>

As is the case for addition, subtraction and multiplication, it is desirable to precompute these values for every combination of digits and store them in a lookup table.

The comparison of digit tuples is implemented by first ensuring the two tuples are of equal length by padding the shorter tuple with zeroes at the beginning. The first elements of both tuples are extracted into two type variables, `XHead` and `YHead`, and are compared using the lookup table. If the digits are equal, the recursion continues with the rest of the tuples, named `XRest` and `YRest`. Otherwise, the result of the last digit comparison is returned. The full implementation can be seen in Listing [\[lst:digit-tuple-comparison\]](#lst:digit-tuple-comparison).

<div class="listing">

``` TypeScript
type CompareArr<X extends Digit[], Y extends Digit[]> = 
  PadStartEqual<X, Y> extends [
    [infer XHead extends Digit, ...infer XRest extends Digit[]],
    [infer YHead extends Digit, ...infer YRest extends Digit[]]
  ]
    ? CmpMap[XHead][YHead] extends infer Result extends number
      ? Result extends 0
        ? CompareArr<XRest, YRest>
        : Result
      : never
    : 0
```

</div>

## Numeric rounding operations

The library implements four operations performing numeric rounding. Truncation is the simplest of the four implementations, where the parsing of numbers into a structured object type is doing the heavy lifting. The truncation itself is done by replacing the fractional part of a number with an empty tuple, as seen in Listing [\[lst:truncation\]](#lst:truncation)

<div class="listing">

``` TypeScript
type Truncate<Number extends SignFloatNumber> =
  SignFloatNumber<Number["sign"], FloatNumber<Number["float"]["int"], []>>
```

</div>

Ceiling and flooring are more complex operations. In the case of the ceiling operation, the number is first truncated and then checked to see if the input number is greater than the truncated number. If that is the case, the truncated number is incremented by one and returned. This behaviour is done to obtain the same result when flooring a negative number. For flooring, the process is similar, but the truncated number is decremented by one if the original number is less than the truncated number. The implementation can be seen in [\[lst:floor\]](#lst:floor).

<div class="listing">

``` TypeScript
type Floor<Number extends SignFloatNumber> =
  TruncateSignFloatNumber<Number> extends 
    infer TrucateNumber extends SignFloatNumber
    ? CompareSignNumbers<Number, TrucateNumber> extends -1
      ? SubSignFloatNumber<
          TrucateNumber,
          SignFloatNumber<"+", FloatNumber<[1], []>>
        >
      : TrucateNumber
    : never
```

</div>

Rounding is the most complex of the four rounding operations. The fractional part's first digit is checked to determine whether it is assignable to the union of rounding up digits ($\{ 5,6,7,8,9 \}$). If that is the case, the truncated number is incremented by one and returned. Otherwise, the truncated number is returned as is, seen in Listing [\[lst:round\]](#lst:round).

<div class="listing">

``` TypeScript
type RoundSignFloatNumber<Number extends SignFloatNumber> =
  Number["float"]["frac"] extends [infer Head extends Digit, ...Digit[]]
  ? Head extends 5 | 6 | 7 | 8 | 9
    ? SignFloatNumber<
        Number["sign"],
        AddFloatNumber<
          FloatNumber<Number["float"]["int"], []>,
          FloatNumber<[1], []>
        >
      >
    : SignFloatNumber<
        Number["sign"], 
        FloatNumber<Number["float"]["int"], []>
      >
  : Number
```

</div>

## Exponentiation

A naive implementation of exponentiation would be based on repeated multiplication. This is an inefficient approach, as the complexity of such an algorithm would be $O(M(x) \cdot 10^n) = O(n^2 \cdot 10^n)$, where $n$ is the number of digits and $M(x)$ is the complexity of multiplication algorithm, in this instance $O(n^2)$.

A more efficient exponentiation method is to perform binary exponentiation instead, as seen in equation [\[eq:exponentiation-by-squaring\]](#eq:exponentiation-by-squaring):

$$\label{eq:exponentiation-by-squaring}
  x^n =
  \begin{cases}
    x \cdot (x^2)^\frac{n-1}{2} & \text{if } n > 0 \text{ is odd}  \\
    (x^2)^\frac{n-1}{2}         & \text{if } n > 0 \text{ is even} \\
    1                           & \text{if } n = 0                 \\
    (\frac{1}{x})^n             & \text{if } n < 0
  \end{cases}$$

It can be shown that the complexity of the algorithm is $O(n^2 \cdot \log_2(10^n))$, a notable improvement over the naive approach.

Parity checks done by `IsEventInt` as seen in Listing [\[lst:parity-check\]](#lst:parity-check) are done by checking the last digit of the exponent. Once again, the even digits are represented by a union type of number literal types. Notably, the conditional type is not a type itself. Developers need to write the `true` and `false` types explicitly.

<div class="listing">

``` TypeScript
  type IsEvenInt<X extends Digit[]> = X extends [
    ...Digit[],
    infer Tail extends Digit
  ]
    ? Tail extends 0 | 2 | 4 | 6 | 8
      ? true
      : false
    : false
```

</div>

The implementation shown in Listing [\[lst:exponentiation-by-squaring-ts\]](#lst:exponentiation-by-squaring-ts) does require trimming of excess zeroes in the exponent to ensure the correctness of a fast assignability check for termination conditions. The implementation differs from the algorithm in Figure [\[fig:exponentiation-by-squaring\]](#fig:exponentiation-by-squaring) in that the `PowerAuxInt` includes an optional type argument `Y` used to convert the method to a tail-recursive generic type, bypassing the need for deferring the instantiation to avoid the depth limit.

<div class="listing">

``` TypeScript
type PowerAuxInt<
  X extends SignFloatNumber,
  N extends Digit[],
  Y extends SignFloatNumber = SignFloatNumber<"+", FloatNumber<[1], []>>
> = TrimEnd<N> extends [0]
  ? Y
  : IsEvenInt<N> extends true
  ? PowerAuxInt<
      MultiplySignFloat<X, X>,
      LongDivisionDigit<N, [2]>["quotient"],
      Y
    >
  : PowerAuxInt<
      MultiplySignFloat<X, X>,
      LongDivisionDigit<SubDigit<N, [1]>, [2]>["quotient"],
      MultiplySignFloat<X, Y>
    >
```

</div>

## $n$-th root extraction

There are some cases where an operation is so complex that the type instantiation limit is reached, and TypeScript will prematurely abort the type-checking of the entire file. One such example is the $n$-th root extraction of a number. The implementation uses the Newton-Raphson method.

The Newton-Raphson method [@gerlachAcceleratedConvergenceNewton1994] is an iterative numerical method for estimating the roots of real-valued functions. Assuming the function $f(x)$ is derivable on $x \ge 0$ and an initial guess for root is $x_0$, then:

$$x_{k+1} = x_k - \frac{f(x_k)}{f'(x_k)}$$

Thus, to estimate the $n$-th root of a number, declared by the function $f(x) = x^n - \alpha$, where $\alpha$ is the target number to apply $n$-th root and $n$ is the degree of the root, the following definition for the next approximation is used:

$$\begin{split}
    x_{k+1} & = x_k - \frac{f(x_k)}{f'(x_k)}                                                                         \\
            & = x_k - \frac{x_k^n - \alpha}{n \cdot x_k^{n-1}}                                                       \\
            & = \frac{1}{n} \left( (n-1) \cdot x_k + \frac{\alpha}{x_k^{n-1}} \right)                                \\
            & = \underbrace{\frac{n-1}{n}}_\text{L} x_k + \underbrace{\frac{\alpha}{n}}_\text{R} \frac{1}{x_k^{n-1}} \\
            & = L \cdot x_k + R \cdot \frac{1}{x_k^{n-1}}                                                            \\
  \end{split}$$

A naive implementation can be done by intimately mirroring the algorithm and nesting the generic types for readability, shown in Listing [\[lst:root-wrong\]](#lst:root-wrong). However, as it turns out, TypeScript will bail out due to the depth limit. Instead, to bypass the limit, the final implementation seen in Listing [\[lst:root-right\]](#lst:root-right) uses the `infer` keyword to defer instantiation as much as possible, essentially treating `infer` as a way to assign intermediate values to variables.

Even so, it is not desired for the algorithm to run indefinitely; instead, the iteration is cut off after seven iterations, as more iterations will cause the type checker to reach the instantiation limit when evaluating.

<div class="listing">

``` TypeScript
type RootDigit<
  Alpha extends SignFloatNumber,
  N extends Digit[],
  Step extends SignFloatNumber = SignFloatNumber<"+", FloatNumber<[1], []>>,
  StepCnt extends Array<0> = []
> = StepCnt["length"] extends 5
  ? Step
  : RootDigit<Alpha, N, MultiplySignFloat<
      SignFloatNumber<"+", DivideInt<[1], N>>,
      AddSignFloatNumber<
        MultiplySignFloat<RootNSubOne<N>, Step>,
        DivideSignFloatNumber<Alpha, PowerSignFloatNumbers<Step, RootNSubOne<N>>>
      >
    >, [...StepCnt, 0]>
```

</div>

<div class="listing">

``` TypeScript
type OneSignFloatNumber = SignFloatNumber<"+", FloatNumber<[1], []>>

type RootDigitIter<
  NSubOne extends SignFloatNumber,
  L extends SignFloatNumber,
  R extends SignFloatNumber,
  Step extends SignFloatNumber = OneSignFloatNumber,
  StepCnt extends Array<0> = []
> = StepCnt["length"] extends 7
  ? Step
  : MultiplySignFloat<L, Step> extends infer LStep extends SignFloatNumber
  ? PowerSignFloatNumbers<
      Step,
      NSubOne
    > extends infer StepPowNSubOne extends SignFloatNumber
    ? DivideSignFloatNumber<
        R,
        StepPowNSubOne
      > extends infer RStep extends SignFloatNumber
      ? AddSignFloatNumber<
          LStep,
          RStep
        > extends infer Sum extends SignFloatNumber
        ? RootDigitIter<NSubOne, L, R, Sum, [...StepCnt, 0]>
        : never
      : never
    : never
  : never

type RootDigit<
  Alpha extends SignFloatNumber,
  N extends Digit[]
> = SignFloatNumber<
  "+",
  FloatNumber<N, []>
> extends infer N extends SignFloatNumber
  ? SubSignFloatNumber<
      N,
      OneSignFloatNumber
    > extends infer NSubOne extends SignFloatNumber
    ? DivideSignFloatNumber<NSubOne, N> extends infer L extends SignFloatNumber
      ? DivideSignFloatNumber<Alpha, N> extends infer R extends SignFloatNumber
        ? RootDigitIter<NSubOne, L, R>
        : never
      : never
    : never
  : never
```

</div>
