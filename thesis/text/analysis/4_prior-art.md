# Prior Art

There are multiple basic implementations of math operations in
TypeScript. Tasks regarding basic math operations are even part of the
TypeChallenges collection[@TypechallengesTypechallenges2023]. However,
most of them only work on integers, as they work on tuple expansion,
which will be further discussed in the implementation part of this
thesis.

Nevertheless, multiple libraries in the [npm]{acronym-label="npm"
acronym-form="singular+abbrv"} registry provide basic math calculations
within the TypeScript type system, but none provide a fully typed parser
of mathematical expressions. Some of the libraries found do provide type
utilities that operate on floating-point numbers instead of integers,
such as `type-fest` [@sorhusSindresorhusTypefest2023] or
`typescript-lodash`[@kawayilinlinKawayiLinLinTypescriptlodash2023]. The
most comprehensive implementation of math operations can be found in the
`ts-arithmetic` library [@arielTypeLevelArithmetic2023], which provides
a fully typed implementation of division.