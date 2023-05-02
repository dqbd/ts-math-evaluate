# Conclusion

This thesis set out to implement a mathematical expression evaluator entirely written in the type system of TypeScript. Core concepts and techniques of TypeScript type-level programming were introduced and explained. The implementation of the expression evaluator was described in detail, and the implementation was evaluated in terms of correctness and performance using type-level unit tests and benchmarking suites.

The created evaluator is a proof-of-concept, demonstrating the capabilities of the TypeScript type system while addressing some of the limitations of the type system by applying workarounds.

This thesis also provides a comprehensive guide to the TypeScript syntax and type system and can be used as a reference for beginners to the type-level programming in TypeScript. Additional tools and utility types were introduced to aid the development of the mathematical evaluator, namely the benchmarking tool and the LL(1) parser generator.

The rest of this chapter will discuss both the practicality of the created types and the limitations of the type system found during development. Finally, the future work will be outlined.

## Practical usage

The TypeScript type system is powerful for static type-checking and inference. However, it is not without its limitations. These advanced types are considered to be extreme and are generally not recommended to be used in production code, as they can severely impact the compilation time and the in-editor developer experience.

Nevertheless, there are some possible practical use cases for these advanced types. Literal types are often used to describe a design system and accompanying design tokens. Namely, numeric literal types are used to describe the spacing and sizing of components. When the spacing is defined in other units, such as `rem` or `em`, developers often need to convert the values into pixels manually. A utility type can be introduced to convert values in `rem` or `em` units into pixels and reverse. This can be further expanded to allow more type transformations, such as converting a Tailwind CSS class name into a CSS string without any TypeScript editor plugins.

The parser and the accompanying parser generator can accept any LL(1) grammar and can be used to parse more complex formats, such as JSON. Finally, the benchmarking tool can be used to benchmark any type-level code in isolation, keeping all the test cases in a single file.

## Limitations of the TypeScript type system

When developing the implementation of the evaluator, some limitations of the TypeScript type system were discovered.

In general, error messages in TypeScript are suboptimal. They tend to be displayed in one line without any formatting, and if they include complicated types, the types are truncated, which leads to a suboptimal debugging experience. Even with the `noErrorTruncation` flag turned on in `tsconfig.json`, the type message is still truncated due to a hard limit. The limit can be artificially raised by patching the TypeScript source code, namely by increasing the `defaultMaximumTrucationLength` limit, but this is not a viable solution for production code. The only other option is to manually recreate intermediate types when debugging complicated types.

The type checker itself contains many hardcoded constraints to prevent performance degradation, ranging from the maximum tuple size to the limit on both instantiation count and depth. Some checks can be bypassed using various workarounds, often at a performance cost, discussed in previous chapters. However, these workarounds are poorly documented in the official TypeScript documentation and can break with new TypeScript releases without further notice.

Even though the TypeScript type system is powerful for complex types, some highly requested features are still missing as of the writing of this thesis, such as the lack of partial type argument inference [@ImplementPartialType] or lack of built-in utility types for type-level assertions. Some of these features can be partially emulated, such as the lack of higher kinded types, but the behaviour can also change with new TypeScript releases.

Finally, as the type checker itself is written in TypeScript to dogfood the language, it can be inherently slow when working with larger TypeScript codebases. Some of these performance issues are being solved by rewriting the type checker in a different programming language, such as Rust [@Stc2023], but the project is still under active development.

## Future work

Most of the future work is geared towards the underlying tooling and utilities rather than the mathematical expression evaluator itself, which can be further extended by adding additional mathematical operations based on the existing utility types implemented in this thesis.

For instance, the LL(1) parser generator is not flexible enough, as it can only generate code for LL(1) grammar, which, while being sufficient for mathematical expressions and other simple formats such as JSON, is not sufficient enough for more complex grammar. Future work could include creating a more generic Look-Ahead LR parser generator, which would be able to parse more complex grammar and programming languages.

The benchmarking utility itself can be extended and packaged both as an [npm]{acronym-label="npm" acronym-form="singular+abbrv"} package and as a GitHub Action. This is especially useful for library maintainers, who can use the additional CI step to monitor potential performance regressions when reviewing pull requests from contributors.
