# Static Typing in JavaScript

JavaScript is a dynamically typed programming language where users do not need to assign types to a variable or a function. The type is automatically inferred by the JavaScript engine at runtime. This feature lowers the barrier of entry to writing JavaScript code, allowing developers to prototype and write code quickly. It can plausibly be one of the possible growth drivers of JavaScript in the last decade, making it the most commonly used programming language, according to the 2022 Stack Overflow Developer Survey [@StackOverflowDeveloper].

However, dynamic typing has its drawbacks. It is harder to detect trivial errors in the code without running it beforehand, and it is more difficult to refactor the code without breaking it, which often leads to poor software quality [@schumacherConceptsProgrammingLanguages2015]. Proponents of static typing insist that static types allow developers to spot potential bugs and mistakes earlier during development and that static typing allows for better tooling, such as richer code completion and better refactoring tools.

There is an upcoming [tc39]{acronym-label="tc39" acronym-form="singular+abbrv"} proposal for adding type annotations in JavaScript, broadly inspired by the TypeScript syntax [@ECMAScriptProposalType2023]. These annotations are only useful for build-time tooling as they are ignored in runtime. The proposal suggests that these annotations should be erased by an additional compilation step. Even though users can already provide static types using JSDoc right now, the syntax is not as clean as the proposed TypeScript-like syntax.

Regardless, many projects aim to introduce static typing to JavaScript, such as Flow or TypeScript, or alternative languages which compile back to JavaScript, such as Elm or ReScript.

## Elm

Elm is a functional programming language designed specifically for building web applications [@ElmDelightfulLanguage]. The language compiles to JavaScript and has a strong static Hindley-Milner-based type system, which allows inferring types more often and reliably. Elm does not provide any escape hatches, such as `any` in TypeScript. Thus it is harder to write unsafe code, as the types must be valid for the code to be successfully compiled.

Elm also includes a lot of quality-of-life improvements and benefits, for instance: enforced purity of functions, out-of-the-box immutability, `case` pattern matching, JSON decoders and encoders for strict parsing, `Maybe` and `Result` monads for avoiding `null` and `undefined` references or its own virtual DOM implementation for efficient rendering of interactive user interfaces. Notably, the Elm Architecture, where the application code is organised into three parts: model, update and view [@ElmArchitectureIntroduction], has greatly inspired other libraries and frameworks such as Redux [@PriorArtRedux2022].

## ReScript

ReScript is a programming language built on top of the OCaml toolchain. Unlike Flow or TypeScript, ReScript is not a superset of JavaScript. Instead, the language compiles into JavaScript. ReScript was created as a spin-off from the Reason programming language and accompanying BuckleScript compiler, aiming to vertically integrate and streamline the adoption barrier caused by the need to be familiar with multiple unrelated tools and toolchains [@BuckleScriptReasonRebranding].

The language aims to be more sound with more powerful type inference than TypeScript, borrowing the Hindler-Milner type system from OCaml implementation [@EfficientInsightfulGeneralization; @HistoryReScript2022]. Thus, most of the time, the types can be automatically inferred without annotating them explicitly, whereas TypeScript utilises bidirectional type-checking [@ReconstructingTypeScriptPart].

## Flow

Flow is a static type checker for JavaScript [@chaudhuriFastPreciseType2017; @Flow2023], which allows developers to annotate their code with static types. Flow is developed by Meta and is internally used in production by Facebook, Instagram and React Native. Type annotations in Flow are fully erasable, meaning that the type annotations are fully removed from the Flow code in order to emit valid JavaScript code. The checking of these types occurs at compile-time before removal in build-time. Flow is also a superset of JavaScript, which means any JavaScript code is a valid Flow code.

One of the primary goals of Flow is to provide type soundness, the ability to catch every error that might happen in runtime at compile-time, no matter how likely it is to happen. A valid Flow code can provide developers with some guarantees about the type a value has in runtime, at the expense of catching errors that are unlikely to happen in runtime.

Both Flow and TypeScript are similar regarding features as of the time of writing. Most of the type-safety differences between Flow and TypeScript have been addressed with the newer versions of TypeScript, even though a "provably correct" type system is a specific non-goal of the TypeScript team [@TypeScriptDesignGoals]. However, developers must opt-in to these features by setting `"strict"` to `"true"` in `tsconfig.json`, whereas these features are enabled by default in Flow.

## TypeScript

TypeScript is a statically typed programming language developed and maintained by Microsoft [@TypeScriptJavaScriptSyntax]. It is a language that transpiles into JavaScript and adds static type-checking to JavaScript [@DocumentationTypeScriptJavaScript]. Unlike Elm or ReScript, TypeScript is a syntactical superset of JavaScript, which means that any valid JavaScript code can be a valid TypeScript code[^1]. Similar to Flow, type annotations provided by the developer are fully erasable either by the TypeScript compiler [cli]{acronym-label="cli" acronym-form="singular+abbrv"} or by other community build tools, such as `babel`[@BabelBabel2023], `esbuild`[@EsbuildExtremelyFast] or `swc`[@SWCRustbasedPlatform].

Type system in TypeScript is considered to be less sound and more forgiving, as soundness is stated as an explicit non-goal of the design team of TypeScript [@TypeScriptDesignGoals], with emphasis on striking a balance between productivity and correctness. By default, the TypeScript type checker is not strict, and the language itself includes an escape hatch for developers to opt out of type-checking by using the `any` type or using `@ts-ignore` comment annotations. Nevertheless, with proper type checker configuration, the type system of TypeScript can be as sound as in Flow.

Both Flow and TypeScript support advanced features such as generics and utility types, with the latter supporting template string literal types and better support for conditional types, unlocking the potential of writing more expressive types, which this master thesis will further explore in more detail.

With deep integration with Visual Studio Code [@VisualStudioCode], the rich build ecosystem and high compatibility with existing JavaScript libraries and tools, TypeScript has become one of the fastest growing languages in terms of usage according to the 2022 Octoverse report by Github [@Octoverse2022State].

[^1]: With a lax type checker configuration
