# Math expression evaluator for literal types in TypeScript

https://projects.fit.cvut.cz/theses/4604

## Assignment

### English

Template literal types, introduced in TypeScript 4.1, expand on string literal types for narrowing down a type to a particular string constant, with the ability to expand into many string literal types.

1. Analyze and describe relevant constructs of the TypeScript type system (concatenation, recursive types, conditional types etc.)
2. Implement a type-safe math expression evaluator with a set of basic operations, using a string literal type both as the input and output of the evaluator.
3. Pick appropriate tools for testing type annotations and ensure the validity of the evaluator with functional tests.
4. Discuss the practical uses of meta types and theoretical and practical shortcomings of the TypeScript type system.

### Czech

Programovací jazyk TypeScript představil ve verzi 4.1 šablonové literálové typy (template literal types), které umožňují definovat a konstruovat literálové typy pro konstantní řetězce (string literal types).

1. Analyzujte a popište potřebné základní typové konstrukty jazyka (zřetězení, rekurzivní typy, podmíněné typy apod.)
2. Navrhněte a implementujte typově bezpečný řešič matematických výrazů s podporou pro sadu základních operací: vstupem je výraz zapsaný jako typový literál pro konstantní řetězec, výstupem výsledek v témže formátu.
3. Zvolte vhodný nástroj pro testování typových anotací a program otestujte funkčními testy.
4. Diskutujte praktické využití meta typů, teoretické a praktické nedostatky plynoucí z typového systému TypeScript.

## Sections

**Introduction**

- Motivation for thesis
- What is a STATIC type system (importance of type safety)
  - Rozdíl mezi static typing vs runtime 
- Cool věci, co dělají lidi s TS (type-fest, ts-belt, )

**Analysis**

- Static Typing in JS
  - Elm
  - ReScript
  - ClojureScript?
  - Flow
  - TypeScript
    - Je velký rozdíl mezi Flow, TypeScript oproti Elm/ReScript/ClojureScript 
    - Buď vytváříme nový jazyk nebo upravovat jazyk
- Core Typescript Syntax
  - Types and their assignability
    - Primitive Types
    - Literal Types
    - Structures (nominal typing vs. structural typing)
      - Relační / hiearchický strom 
    - Unions
    - Intersections
    - `unknown`, `never`, `any`
  - `Record`
  - `Array` and tuples
- Type System of TypeScript (with examples / TypeChallenges)

  - Conditional Types and Inference
  - Loops via Recursive Types
  - Equality Checks
  - Limitations (and how to bypass them)

- TypeScript compiler internals (currently avoid)

  > The idea behind explanation of compiler internals is to explain tracer returned by `—generateTrace` and `—extendedDiagnostics`

  - Scanner / Parser / Binder
  - Compiler
  - Checker

- Prior Art
  - `kawayiLinLin/typescript-lodash`
  - `arielhs/ts-arithmetic`
  - ts-belt, type-fest 

**Implementation**

- Structure of the project
- Explanation behind all of the methods
  - Representation of numbers in TS (`array`, destructured object)
  - Explanation of the code, add alternative methods
  - Okomentovat, proč to reprezentuji do objektů (a nikoliv do řetězců)

**Testing**

- Unit tests, integration tests
  - `eslint`
  - `eslint-plugin-expect-type`
  - Github Actions
- Performance testing
  - Comparison between existing TS math libraries (performance tracing, extended diagnostics)

**Conclusion**
