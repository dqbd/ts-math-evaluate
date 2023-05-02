# Usage of TypeScript

The TypeScript project is made of two major parts available to
developers:

-   `tsc`: the TypeScript Compiler, which is responsible for both type
    checking and outputting valid JavaScript files,

-   `tsserver`: the TypeScript Standalone Server, which encapsulates the
    TypeScript Compiler and language services for use in editors and
    [ide]{acronym-label="ide" acronym-form="singular+abbrv"}s
    [@StandaloneServerTsserver].

While a type-checker is most likely executed manually more often and is
the entry point for developers when using TypeScript, the language
server is equally as useful, as it communicates with the editor via
[lsp]{acronym-label="lsp" acronym-form="singular+full"} to provide
important language services. These include code completion,
auto-importing, symbol renaming etc.

The term in this thesis refers specifically to the process of type
erasure itself. Although the source code may contain various
type-related errors, the TypeScript Compiler (`tsc`) will generate valid
JavaScript files by default as long as the input source file can be
correctly parsed. This enables developers to gradually improve their
code and quickly iterate on its functionality without fixing type errors
immediately. In this sense, the TypeScript Compiler functions more like
a code analyser rather than a traditional compiler seen in other
programming languages. Regardless, in this thesis, the terms and will be
used interchangeably.
