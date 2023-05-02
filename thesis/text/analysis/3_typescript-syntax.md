# Typescript syntax

In TypeScript, types are generally annotated using `:[type annotation]`
syntax, which introduces annotations to various JavaScript constructs,
including variables, function parameters and function return values, to
add constraints to values. Type annotations in TypeScript can be
classified into multiple categories, such as primitive types, literal
types, data structure types, union types and intersection types. The
subsequent sections will provide a comprehensive exploration of these
types alongside more advanced types, such as conditional, mapped, and
recursive types. A basic example of TypeScript type annotation is
presented in Listing [\[lst:basic-annotation\]](#lst:basic-annotation).

<div class="listing">

``` TypeScript
const prefix: string = "Hello world"
const user: {
  name: string;
  age: number
}

function formatUserGreeting(
  user: {
    name: string;
    age: number;
  }, 
  message: string
): string {
  return [message, user.name].join(" ");
}

const greeting: string = formatUserGreeting(user, prefix); 
```

</div>

At runtime, every variable has a single concrete value, but in
TypeScript, the variable is represented solely by its type. A useful
mental model for understanding types is to think of the type as a set of
permitted values [@vanderkamEffectiveTypeScript622019], effectively
constituting the domain of the type.

Developers have the ability to declare types directly in type
annotations, but in certain cases, there may be a need to reuse the same
type in multiple annotations. In order to avoid excessive repetition of
the same declaration, type aliases can be employed to refer to a type by
a name. These type variables act as an alias, which can be used in place
of the type itself. The Listing
[\[lst:type-aliases\]](#lst:type-aliases) shows a refactored
`formatUserGreeting` function of the previous Listing
[\[lst:basic-annotation\]](#lst:basic-annotation) using type aliases.

<div class="listing">

``` TypeScript
type User = {
  name: string;
  age: number
}

const prefix: string = "Hello world"
const user: User

function formatUserGreeting(
  user: User, 
  message: string
): string {
  return [message, user.name].join(" ");
}
```

</div>

## Primitive Types

A primitive value refers to data that is neither an object nor possesses
methods or properties. These primitive values are immutable, which means
they cannot be altered. The TypeScript type system provides a
comprehensive representation of these primitives, as seen in Listing
[\[lst:primitive-types\]](#lst:primitive-types) describing the following
primitive types:

<div class="listing">

``` TypeScript
type StringPrimitive = string
type NumberPrimitive = number
type BigintPrimitive = bigint
type BooleanPrimitive = boolean
type UndefinedPrimitive = undefined
type NullPrimitive = null
type SymbolPrimitive = symbol
```

</div>

Certain primitive types represent a singular data value, such as `null`
or `undefined`, but many of these primitives can represent multiple
values (`boolean` can represent either `true` or `false`), or even an
infinite range of values, as observed in the case of `number`,
`bignumber` or `string` type.

## Literal Types

Literal types are used to describe an exact value as a type. From the
point of view of the type system, a literal type is a subset of one of
the following primitive types: `string`, `number`, `bignumber` or
`boolean`[^1], as seen in Listing
[\[lst:literal-types\]](#lst:literal-types)[^2].

<div class="listing">

``` TypeScript
type Literal = "foo" | 42 | true | 100n;

// Valid code
const Valid: Literal = "foo"

// @ts-expect-error Type '"bar"' is not assignable to type 'Literal'
const Invalid: Literal = "bar" 
```

</div>

## Types for data structures {#sec:typescript-data-structures}

TypeScript also allows annotating data structures such as objects and
arrays with four possible types, depending on the enumerability of items
and their types. The syntax overview can be seen here in Listing
[\[lst:data-structures\]](#lst:data-structures).

-   `tuple` type for describing an array with a fixed number of
    elements, possibly with a different type for each element,

-   `array` type for describing an array with an unknown length, and the
    values are of the same type,

-   `record` type for describing an object with an unknown number of
    keys, and the values are of the same type,

-   `object` type or an `interface` for describing an object with a
    finite set of keys with values of different types per key.

<div class="listing">

``` TypeScript
interface ObjectStructure {
  foo: string;
  bar: number;
}

type ObjectStructure =  
  | { foo: string, bar: number }

type RecordStructure 
  | { [key: string]: number }
  | Record<string, number>

type TupleStructure = [number, string]

type ArrayStructure = number[]
```

</div>

TypeScript syntax offers two notations which can be used for describing
objects with a finite set of key-value pairs in TypeScript: `object` and
`interface`. There are some key differences between these two notations:

1.  The `object` type uses the type alias syntax, whereas an interface
    is defined using a special `interface` keyword.

2.  TypeScript allows multiple declarations of `interface` later merged
    during interpretation. This can be especially useful when augmenting
    non-TypeScript modules [@DocumentationDeclarationMerging].

3.  Even though both support object merging, `interface` can be
    implemented by classes, ensuring that the class adheres to the
    structure defined by the interface. `object` types cannot be
    directly implemented by a class.

4.  Merging `interface` declarations is more performant when merging
    multiple declarations than an intersection of `object` types
    [@Performance].

TypeScript uses structured typing, which entails that TypeScript only
validates the shape of the data. In essence, if the shape of the data is
consistent with that of the type, it is considered to be of that type,
as seen in Listing [\[lst:structured-typing\]](#lst:structured-typing).
This concept is commonly referred to as duck typing, essentially:

<div class="listing">

``` TypeScript
type DuckLike = { quack: () => void; type: string };

const Duck: DuckLike = {
  quack: () => console.log("duck!"),
  type: "duck",
};

// This will be still valid
const Goose: DuckLike = {
  quack: () => console.log("goose!"),
  type: "goose",
};
```

</div>

However, there are real-world use cases for a nominal type system, where
two variables are distinguished by their type name, despite having the
same shape. Emulating nominal typing in TypeScript can be achieved by
introducing an unused property in order to break structural
compatibility [@NominalTyping], as demonstrated in Listing
[\[lst:nominal-types-emulation\]](#lst:nominal-types-emulation).

<div class="listing">

``` TypeScript
type DuckLike = { quack: () => void; type: "duck" };

const Duck: DuckLike = {
  quack: () => console.log("duck!"),
  type: "duck",
};

// This will not be valid
const Goose: DuckLike = {
  quack: () => console.log("goose!"),
  type: "goose",
};
```

</div>

## Union and intersection types {#sec:union-intersection}

Revisiting the concept of types as sets of values, as seen in Listing
[\[lst:literal-types\]](#lst:literal-types), assigning a value
disallowed by the literal type will result in a type error. In
TypeScript, a type is considered if it is either a the set of permitted
values defined by the type (when describing relationships between a
value and a type) or a the sets (when describing relationships between
two types).

When there is a requirement to describe a type that encompasses multiple
types, combining two sets of permitted values into a single set, union
types can be utilised. Union types are defined by the union operator
represented by the `|` symbol, separating the types that are being
combined, referred to as [@DocumentationEverydayTypes]. Essentially,
`X | Y` can be read as a type for a value that can either be of type `X`
or `Y`.

Since a union type can contain a value from any of the member types,
TypeScript permits only those operations that are valid for all member
types within the union. If an operation is only valid for some of the
union member types, type narrowing must be performed. Type narrowing is
a process of refining a broader type to a more specific narrow one,
capturing a subset of values of the original broader type.

An example of type narrowing can be seen in Listing
[\[lst:union-types\]](#lst:union-types), where the function
`printUserId` can accept both a `string` or a `number` as an argument.
In order to invoke `toUpperCase()`, a method valid only for values of
`string` type, it is necessary to perform a check if the parameter is a
`string`. Afterwards, TypeScript has the necessary information to infer
that the type of the checked value must be necessary a `string` and
permits the invocation of `toUpperCase()`.

<div class="listing">

``` TypeScript
function printUserId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase()
  } else {
    return id
  }
}
```

</div>

An intersection of types can be represented by the `\&` operator.
Similarly to the union type, `X \& Y` can be read as a type for a value
that can simultaneously belong to type `X` and `Y`. Intersection types
are particularly relevant when working with object types, as an
intersection of two object types has all properties of both object
types. The rationale is that an object with merged properties is
assignable to all of the intersection member types. For this particular
reason, intersection types are commonly used to merge multiple object
types, as seen in
[\[lst:intersection-types\]](#lst:intersection-types)[^3].

<div class="listing">

``` TypeScript
type Intersection = { a: string } & { b: number }
const item: Intersection = { a: "a", b: 1 }
```

</div>

## `keyof` type and indexed access types

The indexed access type is used to access a specific property type of a
record or a tuple type. The syntax of indexed access types mirrors the
syntax for accessing an object in JavaScript, as seen in Listing
[\[lst:indexed-access-types\]](#lst:indexed-access-types). It is also
possible to use unions as keys to get types of multiple properties of an
object type.

<div class="listing">

``` TypeScript
type User = { firstName: string; lastName: string; age: number }

type Age = User["age"] 
type Names = User["firstName" | "lastName"]
```

</div>

The `keyof` keyword operator can be used to get all possible keys of an
object type. This will return an union of all keys of the provided data
structure type. These are especially useful when working with mapped
types later on. An example can be seen in Listing
[\[lst:keyof\]](#lst:keyof).

<div class="listing">

``` TypeScript
type User = { firstName: string; lastName: string; age: number }
type Keys = keyof User
//   ^? "firstName" | "lastName" | "age"
```

</div>

## Special data types

When working with unions and intersections, it is often necessary to be
able to describe a type, which can describe a union of all possible
types or a type created by intersecting two types with no related
properties. These types are referred to as universal supertypes and
universal subtypes, respectively. Universal supertypes, also known as
top types, are types that are a superset of all other types and are used
to represent any possible value. Whereas universal subtypes, also known
as bottom types, are types that are a subset of all other types and are
often used to describe a type that has no permitted values.

TypeScript includes two top universal supertypes: `any` and `unknown`.
In the case of `any`, every type is assignable to type `any` and type
`any` is assignable to every type [@TopTypesAny]. In general, `any` can
be used as an escape hatch to opt out of type checking. This does have
unintended consequences, as `any` is assignable to every type; it can be
assigned to a different type without any warnings. This is especially
problematic when dealing with external data as the return type of
`JSON.parse()` is `any`. An example of assignability can be seen at
Listing [\[lst:any-assignability\]](#lst:any-assignability).

<div class="listing">

``` TypeScript
let data: any = JSON.parse("...") 

// All of these are valid TypeScript code
data = null
data = true
data = {}

// Still valid code, opting out of type checking
const a: null = data
const b: boolean = data
const c: object = data
```

</div>

`unknown` acts as a more restrictive version of `any`. Every type is
assignable to type `unknown`, but `unknown` is not assignable to any
other type, which can be seen at Listing
[\[lst:unknown-assignability\]](#lst:unknown-assignability). In order to
assign `unknown` to a different type, type narrowing must be performed
by either using type guards, type assertions, equality checks or other
assertion functions.

<div class="listing">

``` TypeScript
let data: unknown = JSON.parse("...") 

// All of these are valid TypeScript code
data = null
data = true
data = {}

// Not valid, as unknown is not assignable to any other type
const a: null = data
const b: boolean = data
const c: object = data
```

</div>

Finally, `never` is a bottom type, acting as a subtype of all other
types, representing a value that should never occur. In the context of
the theory of mathematical logic, `never` acts as a logical
contradiction, describing a value that may never exist. No other type
can be assigned to `never` nor `never` cannot be assigned to any other
type. `never` can be found when attempting to intersect two types that
have no properties in common, such as `string \& number`.

`void` is a specific type used to signify a function which does not
return a value. There is a notable difference between the usage of
`void` when used in context, describing a type for a function with
`void` return type, and when used in the function declaration, as seen
in Listing [\[lst:void-return-type\]](#lst:void-return-type). The former
is used to describe a situation when an implementation of a does return
a value but should be ignored. The latter does enforce that a function
should not return a value at all.

<div class="listing">

``` TypeScript
type voidFn = () => void

// Valid code
const fn1: voidFn = () => true

function fn2(): void {
  // @ts-expect-error Not valid, as void functions cannot return a value
  return true
}
```

</div>

## Enumerations

`enum` type is a distinct subtype used to describe a set of named
constants. Instead of using individual variables for each constant, an
`enum` provides an organised way to express a collection of related
values. `enum` is one of the few TypeScript features which introduce an
additional code added to the compiler output, and enums refer to real
objects at runtime.

An `enum` type consists of members and their corresponding initialisers
for the runtime value of the member. There are two types of enums in
TypeScript: numeric enums and string-based enums. In numeric enums, each
member is assigned a numeric value, as seen in Listing
[\[lst:numeric-enums\]](#lst:numeric-enums). Each member can have an
optional initialiser to specify an exact number corresponding to a
member. If omitted, the value of the member will be generated by
auto-incrementing from previous members.

<div class="listing">

``` TypeScript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

</div>

String-based enums are similar in nature, where each member is assigned
a string value instead. Each member thus must have an initialiser with a
string literal, as seen in Listing
[\[lst:string-based-enums\]](#lst:string-based-enums). The key benefit
of string-based enums is that they tend to keep their semantic value
well when serialising, which is especially helpful when debugging, as
the values of numeric enums tend to be opaque.

<div class="listing">

``` TypeScript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

</div>

## Namespaces

In TypeScript, namespaces, formally known as internal modules, are used
to organise code and prevent naming conflicts in the global scope. In
order to create a namespace, the `namespace` keyword is used, followed
by the identifier of the namespace. The code within the namespace, also
called the scope of the namespace, is isolated from the global
environment, as seen in Listing [\[lst:namespace\]](#lst:namespace).
Only constructs explicitly marked as exported are accessible outside of
the namespace, exposed as a single variable with the name of the
namespace.

<div class="listing">

``` TypeScript
namespace Example {
  type Foo = "Foo"
  const foo: Foo = "Foo"
  
  export type Bar = "Bar"
  export const bar: Bar = "Bar"
}

// @ts-expect-error Not accessible
const a = Example.foo 

// Valid code
const b = Example.bar
```

</div>

One key benefit of namespaces is the ability to merge multiple
namespaces across files. As long as the name of multiple namespaces is
the same, the declarations will be merged into a single declaration.
This feature can split large scopes into multiple files while exposing
all of the properties as a single variable.

## Generic Types

In many cases, it is necessary to write sufficiently reusable code that
must function with types not known beforehand. Generic types allow the
development of such reusable components that can work over a variety of
types rather than a single one. Generic types are created by defining a
type parameter that can be used as a placeholder for a specific type.
The consumers can then replace the placeholder with their desired types
when using the component. In TypeScript, generic types can be defined on
interfaces, functions and classes.

To illustrate the point, consider the implementation of the built-in
`Array` type found in the `lib.*.d.ts` files (a subset can be seen at
Listing [\[lst:array-type\]](#lst:array-type)). The `Array<T>` is a
generic type, which accepts a single type argument `T` and is used to
describe the type of the elements in the array. The type argument `T` is
later used both in arguments and return types of the methods of the
`Array<T>` type: `push()` accepts only elements of the same type as the
array while `pop()` will return an element of the same type.

<div class="listing">

``` TypeScript
interface Array<T> {
  push(...items: T[]): number;

  pop(): T | undedfined;
}

const strArr: Array<string> = []
const numArr: Array<number> = []

strArr.push("one", "two")
numArr.push(1, 2)

const a = strArr.pop()
//    ^? string

const b = numArr.pop()
//    ^? number
```

</div>

Generic types can be interpreted as functions in a meta-programming
language found inside the TypeScript type system itself. The
meta-programming language implements some of the key concepts found in
the functional programming paradigm.

Generic types are considered first-class citizens in the language, being
able to be passed as arguments into other generic types, similar to
functions in a functional programming language. Generic types are also
pure and cannot have any side effects during type checking. Recursion is
also used in the meta-programming language to break down complex
problems into smaller ones and solve them independently.

There is a notable omission, however: generic types cannot receive other
generic types as type arguments [@TypeInferenceHigherorder]. Thus,
higher-order functions are not permitted [^4].

## Type constraints with `extends`

When writing generic types, it is essential to describe some
expectations that a type argument must satisfy. For example, it may be
necessary to accept types which do have a certain property, such as
`length` as seen in Listing [\[lst:extends\]](#lst:extends). To achieve
this, the `extends` keyword can be used to describe the constraints of
the type.

<div class="listing">

``` TypeScript

function getLength<T extends HasLength>(obj: T): number {
  return obj.length
}

const a = getLength("hello")
const b = getLength([1, 2, 3])
const c = getLength({ length: 10 })

// @ts-expect-error 
// Argument of type '{ foo: string; }' is not 
// assignable to parameter of type 'HasLength'.
const d = getLength({ foo: "bar" })
```

</div>

As intended, the generic function will no longer accept arbitrary types.
Instead, only types that satisfy the imposed constraints can be passed
to the function as the argument.

## Conditional types

Within the TypeScript meta-language, developers can write conditions and
branching logic using conditional types. Conditional types follow a
syntax similar to the conditional ternary operators with another case of
overloading the `extends` keyword: `Input extends Expect ? A : B`. This
can be read as An example can be seen in Listing
[\[lst:conditional-types\]](#lst:conditional-types), where the
`IsString<T>` type will resolve to `true` if the type argument `T` is
assignable to `string` and to `false` otherwise.

<div class="listing">

``` TypeScript
type IsString<T> = T extends string ? true : false
```

</div>

The `infer` keyword can be used to deduce or extract a specific type
within the scope of conditional types, essentially acting as a way to
perform pattern matching. With `infer`, a new generic type variable is
introduced, which can be later used within the true branch of the
conditional type, as seen in the implementation of the `ReturnType<T>`
utility type in Listing [\[lst:infer\]](#lst:infer). The `ReturnType<T>`
type will resolve to the return type of the type argument `T`.

<div class="listing">

``` TypeScript
type ReturnType<T> = T extends (...args: any) => infer R ? R : never;
```

</div>

Since TypeScript version 4.7 [@AnnouncingTypeScript4.7], an additional
type constraint can be added for the inferred type, which will be
checked before the conditional type is resolved. This method is useful
when attempting to avoid an additional nested conditional type, as seen
in Listing [\[lst:infer-constraint\]](#lst:infer-constraint), where the
aim is to return the first element of the tuple type only if it is a
string.

<div class="listing">

``` TypeScript
type FirstIfString<T> =
  T extends [infer S extends string, ...unknown[]]
    ? S
    : never;

// is equivalent to 
type FirstIfString<T> =
  T extends [infer S, ...unknown[]]
    ? S extends string ? S : never
    : never;
```

</div>

When a union type is provided within the conditional type, the
conditional type will be resolved for each member type in the union
separately, effectively distributing the union type. In order to prevent
such behaviour, the type argument can be wrapped in a tuple or any other
structure type.

<div class="listing">

``` TypeScript
type ToArray<Type> = Type extends any ? Type[] : never;

// $ExpectType string[] | number[]
type A = ToArray<string | number> 

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// $ExpectType (string | number)[]
type B = ToArrayNonDist<string | number> 
```

</div>

## Mapped types

Occasionally, it is necessary to transform a type into another type. For
instance, a new type may need to be created that is a copy of the
original type but with all properties marked as optional. This can be
accomplished with mapped types. Mapped types are types which are created
using the syntax for index signatures, commonly used in JavaScript for
properties not declared ahead of time. An example is shown in Listing
[\[lst:mapped-types\]](#lst:mapped-types), where the generic type
`ToBoolean<T>` will create a new type which will take all properties
from `T` and change their values to `boolean`.

Mapping modifiers can also be specified to affect the mutability or
optionality of a property: `readonly` and `?` respectively. Prefixing
the modifier with either `+` or `-` will either add or remove the
modifier to the property[^5]. This can be seen in the `Optional<T>` type
in Listing [\[lst:mapped-types\]](#lst:mapped-types), which will create
a new type, which is a copy of the original type, but with all
properties being optional.

<div class="listing">

``` TypeScript
type ToBoolean<T> = {
  [K in keyof T]: boolean
}

type Optional<T> = {
  [K in keyof T]+?: T[K]
}
```

</div>

Introduced in TypeScript 4.1 [@AnnouncingTypeScript4.1], the `as`
keyword can be used to re-map keys in mapped types, allowing developers
to create, transform or filter out keys when creating a new type. An
example is shown in Listing [\[lst:mapped-as\]](#lst:mapped-as), where
the `Omit<T, Key>` creates a new object type based on type `T` with
omitted properties which are assignable to `Key`.

<div class="listing">

``` TypeScript
type Omit<T, Key> = {
  [K in keyof T as Exclude<K, Key>]: T[K]
}
```

</div>

## Recursive Types

A recursive data type is a data type that includes a reference to itself
within the type definition. Recursive types are useful for modelling
complex or hierarchical data structures, such as linked lists or trees.

An example can be seen in Listing
[\[lst:recursive-types\]](#lst:recursive-types), where the `Tree<Value>`
generic type represents an object with a value of type `Value` and
optional left and right subtrees of the same type.

<div class="listing">

``` TypeScript
type Tree<Value> = {
  value: Value,
  left?: Tree<Value>,
  right?: Tree<Value>
}
```

</div>

By combining recursive types with generic types, typical recursive
algorithms key for this thesis can be implemented in TypeScript. One
such example can be seen at Listing
[\[lst:reduce-type\]](#lst:reduce-type), where a `FromEntries<Entries>`
generic type is implemented, converting a list of `[Key, Value]` tuples
into a single object type.

First, an additional optional generic type parameter `Accumulator` is
defined, with an initial type value of `{}}` For every tuple in a list,
an object type containing the current key-value pair with
`{ [K in Key]: Value }}`is created and merged with the accumulator using
the `&` operator. The merged object type is subsequently passed as the
accumulator to the next iteration. Finally, the accumulator is returned
when the list is empty, serving as the final object type.

<div class="listing">

``` TypeScript
type FromEntries<Entries, Accumulator = {}> =
  Entries extends [infer Entry, ...infer Rest]
    ? FromEntries<
        Rest,
        Entry extends [infer Key, infer Value]
          ? { [K in Key]: Value } & Accumulator
          : Accumulator
      >
    : Accumulator;
```

</div>

There are some limitations regarding recursive types. To prevent
infinite recursion, TypeScript limits the instantiation depth to ensure
a consistent and performant developer experience. As of writing, the
limit is set to 100 levels for type aliases and 5 million type
instantiations [@ImplementationCheckerTs2023]. Thanks to the
tail-recursion elimination optimisation, the limit is set to 1000 levels
for tail-optimized recursion types. Thus, it is desired to use tail
recursion whenever possible.

Another limitation related to the generic recursive types is that the
variables declared with `infer` do not inherit the constraints of the
parent type, as seen in Listing
[\[lst:recursive-constraints\]](#lst:recursive-constraints). As the
`Tail` type lost the type constraint of `Haystack`, the tail cannot be
passed as the new haystack of the `FilterWrong` type. Addressing this
problem requires adding an extra type constraint to the inferred type.

<div class="listing">

``` TypeScript
type FilterWrong<Haystack extends string[], Needle extends string> =
  Haystack extends [infer Head, ...infer Tail]
    ? Head extends Needle
      // $ExpectError Type 'Tail' does not satisfy the constraint 'string[]'.
      ? [Head, ...FilterWrong<Tail, Needle>]
      : FilterWrong<Tail, Needle>
    : [];

type FilterCorrect<Haystack extends string[], Needle extends string> =
  Haystack extends [infer Head, ...infer Tail extends string[]]
    ? Head extends Needle
      ? [Head, ...FilterCorrect<Tail, Needle>]
      : FilterCorrect<Tail, Needle>
    : [];
```

</div>

## Template Literal Types

Finally, template literal types are based on the string literal types,
allowing string interpolation and manipulation within the TypeScript
type system. In the context of this thesis, template literal types are
used to create a parser of mathematical expressions. However, template
literal types can be utilised to create fully typed string-based
[dsl]{acronym-label="dsl" acronym-form="singular+full"}.

Similar to the syntax of JavaScript template literal strings, backticks
are used to create a new template literal type. When used with a string
literal type, a template literal will create a new string literal type
by concatenation [@DocumentationTemplateLiteral]. For example, the type
`` \`{}Hello \$\{"World"\}\`{}} ``will create a new string literal type
`"Hello World"`.

Template literal types can be used with primitive types as well, the
only limitation being that the primitive type must be stringifiable.
That includes all of the primitive types except the `symbol` type. When
created, these types are a subset of their primitive type and can be
used to work as a validation mechanism matching a string of an expected
format. For instance, the type `` \`{}localhost:\$\{number\}\`{}} ``will
create a new string literal type that will match a string of the format
`localhost:PORT`, where `PORT` is a number.

The distributive nature of union types applies to template literal
strings as well: the type will be applied for every member type of the
union to the template literal, as seen in the Listing
[\[lst:union-template-literal\]](#lst:union-template-literal), where a
new `Style` type is created with all of the possible combinations of the
`Variants` and `Weights` types. Generally, avoiding combinations of big
union types is preferable, as it can lead to worse type-checking
performance or an error if a union type reaches 1 000 000 member types.

<div class="listing">

``` TypeScript
type Variants = "primary" | "secondary"
type Weights = 100 | 200 | 300

type Style = `${Variants}-${Weights}`
//   ^? | "primary-100" | "primary-200" | "primary-300" 
//      | "secondary-100" | "secondary-200" | "secondary-300"
```

</div>

Ultimately, inference in template literal types can be used to perform
pattern matching within string literals with the combination of
conditional types and the `infer` keyword. As shown in Listing
[\[lst:pattern-matching-template-literal\]](#lst:pattern-matching-template-literal),
a generic type `SplitString` is presented, which splits a literal string
type into a tuple of substrings with a space as the delimiter. The aim
is to perform pattern matching a string with `Head`, containing the
first character, and `Rest`, including the rest of the split string, as
the two inferred types as a result. Type constraints are also applied
for the inferred types to ensure the types are assignable to
`string`[^6]. Both of the inferred types are used to create a new tuple
type, with `Head` being the first element of the tuple and `Rest` used
in a recursive call to split the rest of the string.

<div class="listing">

``` TypeScript
type SplitString<Input extends string> = 
  Input extends `${infer Head extends string} ${infer Rest extends string}`
    ? [Head, ...SplitString<Rest>]
    : [Input];
```

</div>

[^1]: Both `null` and `undefined` are literal types as well

[^2]: The following listing uses union types, described in Section
    [1.4](#sec:union-intersection)

[^3]: It is also possible to use the `extends` keyword to merge
    interfaces instead

[^4]: There is a way to create such type using HOTScript, more on that
    later

[^5]: \+ is assumed by default if omitted

[^6]: Albeit unnecessarily, as TypeScript automatically applies the
    `string` type constraint in this instance
