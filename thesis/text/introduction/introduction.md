# Introduction

## Motivation

TypeScript, a typed superset of JavaScript, is quickly gaining
popularity in the JavaScript development ecosystem, and type-safety, the
concept of validating data types, is
[@jsworldconferenceFredSchottTypesafety2023]. As of 2023, over 66% of
developers are using TypeScript most of the time, either avoiding
JavaScript entirely or spending the majority of time working with
TypeScript codebases [@StateJS2022]. Over the years, TypeScript has
transformed from a simple type annotation tool to a full-fledged
programming language within the type system itself. Multiple libraries
with advanced TypeScript types have emerged to improve the developer
experience. Libraries such as Prisma for database type-safety
[@PrismaPrismaNextgeneration], Zod for combining schema validation and
static type inference [@mcdonnellZod2023], or tRPC for API end-to-end
type-safety across boundaries [@TRPC2023]. With intelligent suggestions
in the editor of choice, TypeScript ensures high code quality while
avoiding any runtime costs due to the type system being evaluated during
compilation. With editors and [ide]{acronym-label="ide"
acronym-form="singular+abbrv"}s using a language server powered by
[lsp]{acronym-label="lsp" acronym-form="singular+full"} to provide the
developer with valuable suggestions, there is an incentive to utilise
the type system instead of running a daemon alongside or adding a build
step.

However, TypeScript is only as powerful as the types declared and
received. A significant burden is laid on the maintainers of libraries
to provide descriptive and valuable types. This thesis aims to lay out
and highlight the capabilities and techniques of the TypeScript type
system when applied to a non-trivial problem domain. The type-only
implementation of the math expression evaluator serves as a practical
case study, demonstrating the power of the TypeScript type system and
the benefits of type safety.

## What is a static type system

For years, type systems in programming languages have been a well-known
and heavily discussed topic. The main goal of a type system is to
provide a formal specification of the types of data that a program can
manipulate.

In statically typed languages, the type of a variable is known at
compile time. The compiler uses the additional information about data
types to verify the source code during compilation. The data type itself
can be deduced from the usage in the code (type inference), or a
programmer explicitly specifies the data type of a variable before
usage. Examples of such languages using static typing are, for instance,
Java, C# or C++.

Whereas in dynamically typed languages, the type of a variable is
determined at runtime based on the value being assigned, it does not
need to be explicitly declared by the developer or known at compile time
via type inference. Some of the popular dynamically typed languages
include Python, Ruby, PHP, and, most notably, JavaScript, which is
widely used to create interactive and dynamic user interfaces on the web
platform. Dynamically typed languages tend to be more flexible and allow
developers, notably beginner developers, to write code faster and
iterate quicker.

Static typing offers numerous compelling benefits that can enhance the
development process. First, a large class of errors is caught earlier in
the development process. This reduces the likelihood of bugs and runtime
issues that can be difficult to diagnose and debug. With static typing,
developers can rely on a compiler system to ensure the code conforms to
the expected data types. Developers can also refactor existing typed
code more confidently, as the system gives developers direct feedback
when refactoring.

Furthermore, by writing type annotations, developers are actively
self-documenting the code, making the code more readable and easier to
understand, especially when dealing with unfamiliar code. Finally, even
though an initial commitment is necessary by writing type annotations at
first, a more powerful type system can determine the developer's intent
without writing additional code as the development progresses.

## Structure of the work

This thesis will provide a comprehensive analysis of relevant advanced
constructs found in the TypeScript type system and how they can be used
to allow robust meta-programming within the types themselves. An
implementation of a generic math expression evaluator library that
operates strictly on the type level is provided to demonstrate the
capabilities of the type system, followed by a discussion on testing and
performance of the library and the impact on type checking and
development experience in the editor.