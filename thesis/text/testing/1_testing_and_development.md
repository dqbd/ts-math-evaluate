# Testing and development

During the development of the type-level mathematical expression
evaluator, several invaluable tools were discovered and utilised that
significantly contributed to the implementation. This section is devoted
to discussing these tools and their impact on the overall development
process.

The core of the development experience is underpinned by TypeScript
Standalone Server, also known as `tsserver`. `tsserver` encapsulates
both the compiler and the accompanying language services for use in
editors and [ide]{acronym-label="ide" acronym-form="singular+abbrv"}s,
communicating via [lsp]{acronym-label="lsp"
acronym-form="singular+abbrv"} to add support for code completion,
auto-importing, symbol renaming etc. `tsserver` also provides the
ability to see the inferred types of any symbol by hovering on top the
symbol, as seen in Figure [1](#fig:tsserver-hover). This service is
invaluable when developing a type-level library, as it allows the
developer to break down complex types into smaller pieces, achieving
better readability.

<div id="fig:tsserver-hover" class="figure">

![](text/testing/tsserver-hover.png)

<div class="caption">

Inferred type on hover in [vscode]{acronym-label="vscode"
acronym-form="singular+abbrv"}

</div>

</div>

Another critical tool used when developing the implementation is
`vscode-twoslash-plugin` extension [@theroxVscodetwoslashqueries2023].
In order to avoid hovering the mouse over a symbol to see the inferred
type, developers can write the `// ^?` comment, with the caret pointing
to the targeted symbol. The plugin will then display an inlay hint with
the inferred type of the selected symbol, as seen in Figure
[2](#fig:twoslash-plugin).

<div id="fig:twoslash-plugin" class="figure">

![](text/testing/vscode-twoslash-plugin.png)

<div class="caption">

Twoslash syntax of `vscode-twoslash-plugin`

</div>

</div>

Finally, Pretty TypeScript Errors [@balasianoPrettyTypeScriptErrors2023]
attempts to parse and reformat the TypeScript error messages to be more
human-readable in [vscode]{acronym-label="vscode"
acronym-form="singular+abbrv"}. This is especially helpful when dealing
with complex object types, where the error messages can become
unreadable since the error message and the serialised type is printed
out on a single line, as seen in Figure [3](#fig:pretty-ts-errors).

<div id="fig:pretty-ts-errors" class="figure">

![](text/testing/pretty-ts-errors.png)

<div class="caption">

Formatting errors with Pretty [ts]{acronym-label="ts"
acronym-form="singular+abbrv"} Errors extension

</div>

</div>

Some generic types include an accompanying unit test to ensure
correctness and prevent regression. Testing is backed with
`eslint`[@ESLint2023], a static code analyser for JavaScript and
TypeScript. Configuration-wise, `@typescript-eslint/parser` has been set
up as the parser used by ESLint for properly analysing TypeScript code,
and `eslint-plugin-expect-type` has been added for writing type
assertions as comments. `eslint-plugin-expect-type` enables writing
`\$ExpectType`, `\$ExpectError` and twoslash type assertions (`// ^?`).
An example test assertion can be seen in Listing
[\[lst:expect-type\]](#lst:expect-type).

<div class="listing">

``` TypeScript
// $ExpectType "0.3619047620"
type EvaluateCase = Evaluate<
  RecursiveParser.Parse<Lexer<"3.1 + 2.5 * (1 - 5.6) / 4.2">>
>
```

</div>
