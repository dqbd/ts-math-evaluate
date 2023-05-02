# Higher kinded types

[hkt]{acronym-label="hkt" acronym-form="singular+full"}, also known as
higher-order types, are a powerful type system language feature that
enables describing expressive generic types by allowing accepting other
generic types as type arguments. To demonstrate, consider the following
Listing [\[lst:duplicate-generic-types\]](#lst:duplicate-generic-types).
As can be seen, all three generic types do essentially the same type
instantiation, only with different type constructors.

<div class="listing">

``` TypeScript
type Foo<O> = O extends string ? `Foo<${O}>` : never
type Bar<O> = O extends string ? `Bar<${O}>` : never
type Baz<O> = O extends string ? `Baz<${O}>` : never

type MapValuesWithFoo<O> = { [K in keyof O]: Foo<O[K]> }
type MapValuesWithBar<O> = { [K in keyof O]: Bar<O[K]> }
type MapValuesWithBaz<O> = { [K in keyof O]: Baz<O[K]> }
```

</div>

With [hkt]{acronym-label="hkt" acronym-form="singular+abbrv"}s, it is
possible to define a single higher-order generic type, that accepts a
type constructor as an argument. The type constructor is then applied to
each property of the object type. The result is shown in Listing
[\[lst:proposed-hkt-syntax\]](#lst:proposed-hkt-syntax).

<div class="listing">

``` TypeScript
type MapValuesWith<O, T<~>> = { [K in keyof O]: T<O[K]> }

type MapValuesWithFoo<O> = MapValuesWith<O, Foo>;
type MapValuesWithBar<O> = MapValuesWith<O, Bar>;
type MapValuesWithBaz<O> = MapValuesWith<O, Baz>;
```

</div>

With higher kinded types, it is possible to declare a monad generic type
[@wadlerMonadsFunctionalProgramming1993] or applicative functors
[@mcbrideApplicativeProgrammingEffects2008], design patterns commonly
found in functional programming languages such as Haskell or Scala.

However, as of writing, higher-kinded types are not natively supported
by TypeScript [@DocumentationTypeScriptFunctional]. Fortunately, it is
possible to emulate the behaviour of higher kinded types.

There are two ways to achieve the behaviour of [hkt]{acronym-label="hkt"
acronym-form="singular+abbrv"}. One such way can be achieved by
implementing lightweight higher-kinded polymorphism
[@yallopLightweightHigherKindedPolymorphism2014] and defunctionalisation
of kinds [@reynoldsDefinitionalInterpretersHigherorder1972], a technique
for translating higher-order programs into a first-order language. The
main idea is to create a mapping of unique names of type constructors to
their implementations. Afterwards, a `Kind` utility converts the name
and the appropriate type argument to the corresponding higher-kinded
type. An example can be seen in Listing
[\[lst:emulating-hkt-legacy\]](#lst:emulating-hkt-legacy).

<div class="listing">

``` TypeScript
type URItoKind<A> = { "Foo": Foo<A>; "Bar": Bar<A>; "Baz": Baz<A> }
type URI = keyof URItoKind<unknown>
type Kind<F extends URI, A> = URItoKind<A>[F];

type MapValuesWith<O, Type extends URI> = Kind<Type, O>
```

</div>

This method is historically used in libraries for typed functional
programming such as `fp-ts` [@GcantiFptsFunctional]. Unfortunately, this
method requires a central registry of URIs that are used to identify the
appropriate type constructor and extendability based on module
augmentation is limited.

The other possible method for implementing [hkt]{acronym-label="hkt"
acronym-form="singular+abbrv"}s is by utilising the properties of type
unification with `this`. This method is thoroughly used in HOTscript
[@vergnaudHigherOrderTypeScriptHOTScript2023] and a simplified
implementation can be seen in Listing
[\[lst:emulating-hkt\]](#lst:emulating-hkt).

<div class="listing">

``` TypeScript
interface Fn { input: unknown; output: unknown; }

type Call<fn extends Fn, input> = (fn & { input: input })["output"];

interface Foo extends Fn {
  output: this["input"] extends infer O extends string ? `Foo<${O}>` : never;
}

interface Bar extends Fn {
  output: this["input"] extends infer O extends string ? `Bar<${O}>` : never;
}

interface Baz extends Fn {
  output: this["input"] extends infer O extends string ? `Baz<${O}>` : never;
}

type MapValuesWith<O, Wrap extends Fn> = {
  [K in keyof O]: Call<Wrap, O[K]>
}
```

</div>

The most popular implementation of the latter method, HOTScript, exposes
most of the core functionality of the library as a public facing API.
Thus, an additional public facing API for mathematical operations has
been exposed for users of HOTScript, extending the library with an
advanced mathematical expression evaluator implemented in this work.
