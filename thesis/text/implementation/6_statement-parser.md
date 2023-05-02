# Statement parser and evaluator

The generic types for mathematical operations are well suited for simple
expressions. However, the proposed interface can be too verbose when
describing complex formulas. A more elegant solution is to represent
both input and output as a literal string type and let a compiler do the
parsing and evaluation of the expression. The input literal string type
will contain a mathematical expression in infix notation, and the output
literal string type will contain the result of the expression. The
compiler is built in three parts: the lexer, the parser and the
evaluator, which will be described in the following sections.

## Lexer

The lexical analyser (lexer) is responsible for dividing the input
literal string type into a sequence of meaningful units called tokens.
The goal of a lexer is to remove whitespaces and inconsistencies to
simplify the input stream, which is helpful for later stages of parsing.
One such example is the parsing of numbers: consuming a single number
token is easier than parsing each digit of a number, which can
unnecessarily complicate the design of a parser.

The following section will provide an in-depth look into the handwritten
lexer implementation. Namespaces have been used to describe the object
types representing tokens, ensuring proper isolation between different
type aliases and preventing naming clashes without the need to resort to
prefixing. An example can be seen in
[\[lst:lexer-token-namespace\]](#lst:lexer-token-namespace), where
`Plus` and `Minus` are type aliases for the object types, whereas `_` is
a union type for when a placeholder for a token is needed. Also, instead
of utilising the `never` type for errors, a string enum is used to
prevent unintended matches when performing assignability checks, as
`never` is a subtype of all types.

<div class="listing">

``` TypeScript
enum Error {
  Lexer = "LexerError",
  Parser = "ParserError",
}

namespace Token {
  export type Plus = { type: "Plus" } 
  export type Minus = { type: "Minus" } 
  export type _ = Plus | Minus
} 
```

</div>

The lexing itself is done by a generic type, which accepts a literal
string type as a type argument and returns either a string enum as an
error or an object type containing the matched token and the remaining
unparsed input. As seen in Listing `lst:lexer-structure`, the
`HandleToken` attempts to perform pattern matching on the first
character of the input string literal type `T`. If succeeded, the
matched token is returned wrapped in an object type defined by
`LexResult` generic type, passing both the matched token and the
remaining input to the next iteration of the `HandleToken` generic type.
If the pattern matching fails, the `Error.Lexer` string enum is returned
instead. This structure can be chained together to create a lexer for
multiple token types, such as function keywords or numbers.

<div class="listing">

``` TypeScript
type LexResult<Rest extends string, Result extends Token._> = {
  result: Result
  rest: Rest
}
type HandleToken<T extends string> = 
  T extends `${infer Head}${infer Rest}`
  ? Head extends "+"
    ? LexResult<Rest, Token.Plus>
    : Error.Lexer
  : Head extends "-"
    ? LexResult<Rest, Token.Minus>
    : Error.Lexer
  : Error.Lexer
```

</div>

## Parser

Infix notation is the most common way of writing mathematical
expressions and is more intuitive for humans to read and write. However,
it is not ideal for computers due to the complexity of parsing
algorithms, which must adequately evaluate parentheses and operator
precedence rules. Postfix notation addresses the shortcomings of infix
notation by explicitly stating the order of computation, making the
evaluation unambiguous.

Various methods exist for converting an expression in infix notation.
However, this thesis focuses on implementing a top-down LL(1) parser for
mathematical expression. The main reason for choosing the LL(1) parser
is the extendibility and suitability for supporting other LL(1) grammars
more readily. Some other common parsers were considered for this thesis,
including the Shunting-Yard algorithm, using two stacks for operators
and output operands, and the Pratt parser, a recursive descent parsing
algorithm utilising a precedence table for extendability.

In order to explain the LL(1) parser, the following sections will
describe the core concepts of grammar and parsing. Grammar is a set of
rules that defines the syntax of a language. The grammar
$G = (\Sigma, N, R, S)$ consists of a set of terminals $\Sigma$, a set
of non-terminals $N$, a set of production rules $R$ and a start symbol
$S$. Terminals are the basic unit of the language, while non-terminals
are placeholders for other terminals and non-terminals. Production rules
define how non-terminals can be expanded into a sequence of other
non-terminals and terminals, while the start symbol defines the starting
non-terminal. The parsing itself will create a derivation, which is a
sequence of production rules applications transforming a string of
symbols, usually starting from the start symbol of the grammar.

A derivation can be visualised as a tree, also known as the derivation
tree or parse tree. Each node of the tree represents a symbol in the
string, and each edge represents a production rule application. The root
of the tree is the start symbol of the grammar, and the leaves are the
terminal symbols of the string.

There are multiple ways to construct a derivation tree: either by
replacing the leftmost non-terminal symbol with the righthand side of a
production rule or by replacing the rightmost non-terminal symbol with
the righthand side of a production rule. The former is known as the
leftmost derivation, while the latter is known as the rightmost
derivation. Finally, an ambiguous grammar is a grammar that can produce
multiple derivation trees for the same string.

As an example, consider the given simplified grammar for mathematical
expressions applied for the expression $3 + 4 * 5$. As can be seen in
Figure [1](#fig:ambiguous-grammar), the given grammar is ambiguous, as
there are multiple possible derivation trees for the given input string.

<div id="fig:ambiguous-grammar" class="figure">

<div class="multicols">

2 \] + \[ .E \[ .E \[ .4 \] \] \* \[ .E \[ .5 \]\] \] \]

\] + \[ .E \[ .4 \] \] \] \* \[ .E \[ .5 \] \] \]

</div>

<div class="multicols">

3

1.  `E` $\rightarrow$ `E` `"+"` `E` .

2.  `E` $\rightarrow$ `E` `"*"` `E` .

3.  `E` $\rightarrow$ `"number"` .

</div>

<div class="caption">

An example of ambiguous grammar and the parsing tree for $3+4*5$

</div>

</div>

LL(1) parsers are a class of top-down parsers that read the input string
from left to right and construct a leftmost derivation of the input.
They use a single token of lookahead when parsing a sentence, meaning
that the parser can only see the next token before parsing. LL(1)
parsers recognise LL(1) grammars, which are a special case of
context-free grammars. The grammar must be unambiguous, without any left
recursion and common prefixes among the alternatives of any expansion
rule to be deterministic.

The parser relies upon two important concepts: the FIRST($\alpha$) and
FOLLOW($A$) sets. Assuming a context-free grammar
$G = (\Sigma, N, R, S)$, the FIRST($\alpha$) set is a set of terminals
that can appear as the first symbol in a string derived from $\alpha$.
Formally, FIRST($\alpha$) can be defined as follows:

$$\text{FIRST}(\alpha) = \{ a | \alpha \Rightarrow^\star a\beta, a \in \Sigma, \alpha, \beta \in (N \cup \Sigma)^\star \} \cup \{ \varepsilon | \alpha \Rightarrow^\star \varepsilon \}$$

The FOLLOW($A$) set is a set of terminals that can appear as the next
symbol in a string derived from a given non-terminal symbol $A$.
Formally, FOLLOW($A$) can be defined as follows:

$$\text{FOLLOW}(A) = \{ a | S \Rightarrow^\star \alpha A\beta, a \in \text{FIRST}(\beta) \}$$

Given both the FIRST($\alpha$) and FOLLOW($A$) sets, a parsing table can
be constructed. The parsing table is created as follows: for each of the
production rule $A \rightarrow \alpha$ found in the grammar, do the
following:

1.  For each terminal $a$ found in the FIRST($\alpha$), add the
    production role $A \rightarrow \alpha$ to the parsing table at the
    position $[A, a]$.

2.  If the $\varepsilon$ token, determining the end of input, is present
    in the FIRST($\alpha$) set, add $A \rightarrow \alpha$ to the
    parsing at position $[A, b]$ for each terminal $b$ in the FOLLOW(A)
    set.

When designing a LL(1) grammar for mathematical expressions, operator
precedence must be taken into consideration, as the expression found in
the input string literal type is written in the infix notation. Left or
right associativity is a key constraint as well, with exponentiation
being an operator with right associativity instead of left associativity
as the other operators. The precedence and associativity rules for the
operators can be seen in Table [1](#table:associativity).

<div id="table:associativity">

   **Precedence**  **Operator Type**                     **Associativity**
  ---------------- ------------------------------------- -------------------
         1         Addition, Subtraction                 left-to-right
         2         Multiplication, Division, Remainder   left-to-right
         3         Factorial                             non-associative
         4         Unary plus, Unary negation            non-associative
         5         Exponentiation                        right-to-left
         6         Function call, grouping               non-associative

  : Associativity and precedence rules for math expressions

</div>

The final grammar used for this thesis can be seen in Figure
[2](#fig:math-grammar). The operator precedence rules are baked into the
grammar itself, where the non-terminals representing the higher
precedence operations are expanded later. The associativity of operators
has been taken into consideration as well by changing the position of
the non-terminal from the lefthand side, essentially switching from left
recursion to right recursion and vice versa. An example can be seen in
[2](#table:associativity-grammar), where both the previous context-free
grammar and the appropriately modified LL(1) version of the grammar is
shown to demonstrate the difference between these two grammars.

<div id="fig:math-grammar" class="figure">

<div class="multicols">

2

1.  `START` $\rightarrow$ `ADD` .

2.  `ADD` $\rightarrow$ `MUL` `ADDx` .

3.  `ADDx` $\rightarrow$ `"+"` `MUL` `ADDx` .

4.  `ADDx` $\rightarrow$ `"-"` `MUL` `ADDx` .

5.  `ADDx` $\rightarrow$ `$\varepsilon$` .

6.  `MUL` $\rightarrow$ `FACT` `MULx` .

7.  `MULx` $\rightarrow$ `"*"` `FACT` `MULx` .

8.  `MULx` $\rightarrow$ `"/"` `FACT` `MULx` .

9.  `MULx` $\rightarrow$ `"%"` `FACT` `MULx` .

10. `FACT` $\rightarrow$ `UNARY` `FACTx` .

11. `FACTx` $\rightarrow$ `"!"` `FACTx` .

12. `FACTx` $\rightarrow$ `$\varepsilon$` .

13. `UNARY` $\rightarrow$ `"-"` `UNARY` .

14. `UNARY` $\rightarrow$ `"+"` `UNARY` .

15. `UNARY` $\rightarrow$ `POW` .

16. `POW` $\rightarrow$ `TERM` `POWx` .

17. `POWx` $\rightarrow$ `"^"` `POW` .

18. `POWx` $\rightarrow$ `$\varepsilon$`.

19. `TERM` $\rightarrow$ `"unary"` `"("` `ADD` `")"` .

20. `TERM` $\rightarrow$ `"binary"` `"("` `ADD` `","` `ADD` `")"` .

21. `TERM` $\rightarrow$ `"("` `ADD` `")"` .

22. `TERM` $\rightarrow$ `"number"` .

</div>

<div class="caption">

LL(1) grammar for mathematical expressions

</div>

</div>

<div id="table:associativity-grammar">

  **Left associativity**                         **Right associativity**
  ---------------------------------------------- -------------------------
                                                 
  `ADD` $\rightarrow$ `ADD` `"+"` `TERM` `.`     
  `ADD` $\rightarrow$ `TERM` `"+"` `ADD` `.`     
                                                 
  `ADD'` $\rightarrow$ `"+"` `TERM` `ADD'` `.`   
  `ADD'` $\rightarrow$ `$\varepsilon$` `.`       
  `ADD'` $\rightarrow$ `"+"` `ADD` `.`           
  `ADD'` $\rightarrow$ `$\varepsilon$` `.`       

  : Grammar comparison between left-associativity and
  right-associativity

</div>

A custom code generation tool has been developed to generate a parser
running entirely in the TypeScript type system from the provided LL(1)
grammar, using the aforementioned algorithm for creating the parsing
table and appropriate recursive descent parser. The interface of a
parser is defined as a generic type `Parser`, accepting a tuple of lexer
tokens and a possible output [ast]{acronym-label="ast"
acronym-form="singular+abbrv"} node type as type parameters, seen in
Listing [\[lst:parser-interface\]](#lst:parser-interface). The generic
type returns an object type with an additional `head` property for
simplifying the matching of the current lookahead token needed by the
LL(1) parser. `ConsumeParser` is a generic type for consuming a token
from the input stream and returning a new object type with the rest of
the token stream.

<div class="listing">

``` TypeScript
interface Parser<T extends Token._[] = Token._[], A extends AST._ = AST._> {
  tokens: T
  head: T[0]
  return: A
}

type ConsumeParser<
    Match extends Token._,
    TParser extends Parser
  > = TParser["head"] extends Match
    ? TParser["tokens"] extends [Token._, ...infer Rest extends Token._[]]
      ? Parser<Rest, TParser["return"]>
      : []
    : Error.Parser
```

</div>

With the following building blocks, it is possible to write a recursive
descent parser based on the obtained parser table. An example can be
seen in Listing [\[lst:pow-parser\]](#lst:pow-parser), where a
non-terminal `POW` and `POWx` are transformed into generic types
accepting a type instance of `Parser` as the type parameter. The generic
type attempts to match a lexer token by performing an assignability
check. If succeeded, either the token can be consumed by using
`ConsumeParser`, yielding a new parser to work with, or the parser can
be passed on to the next generic type. The `ReturnParser` generic type
reassigns the AST node, essentially acting as a way to return a value
from a generic type.

<div class="listing">

``` TypeScript
type POWx<T extends Parser> = T["head"] extends Token.Power
  ? ConsumeParser<Token.Power, T> extends infer T extends Parser
    ? POW<T> extends infer R extends Parser
      ? ReturnParser<R, AST.Binary<T["return"], "^", R["return"]>>
      : Error.Parser
    : Error.Parser
  : T["head"] extends
      | Token.EOF | Token.Factorial | Token.Multiply
      | Token.Divide | Token.Modulo | Token.Plus
      | Token.Minus | Token.RightBracket | Token.Comma
  ? T
  : Error.Parser

type POW<T extends Parser> = T["head"] extends
  | Token.UnaryFunction | Token.BinaryFunction | Token.LeftBracket | Token.Number
  ? TERM<T> extends infer T extends Parser
    ? POWx<T> extends infer T extends Parser
      ? T
      : Error.Parser
    : Error.Parser
  : Error.Parser
```

</div>

## Evaluator

Finally, the evaluator takes the [ast]{acronym-label="ast"
acronym-form="singular+abbrv"} returned by the parser as the input and
returns a string literal type containing the result of the expression.

As the [ast]{acronym-label="ast" acronym-form="singular+abbrv"} does
already take operator precedence and associativity into account, the
evaluator itself only recursively traverses the tree, visiting each of
the [ast]{acronym-label="ast" acronym-form="singular+abbrv"} nodes and
performing the appropriate operation by pattern matching. A shortened
example can be seen in Listing
[\[lst:evaluator-example\]](#lst:evaluator-example).

<div class="listing">

``` TypeScript
export type Evaluate<T> = T extends AST.Binary<
  infer Left,
  infer Op,
  infer Right
>
  ? Op extends "+"
    ? Evaluate<Left> extends infer LeftStr extends NumberLike
      ? Evaluate<Right> extends infer RightStr extends NumberLike
        ? Add<LeftStr, RightStr>
        : never
      : never
    : never
  : T extends AST.Number<infer Value extends string>
  ? Value
  : never
```

</div>

The evaluator itself is not required per se, and the expression can be
evaluated directly in the parser, but to avoid the instantiation depth
limit and to simplify debugging and unit testing, the parser emits an
[ast]{acronym-label="ast" acronym-form="singular+abbrv"} as a temporary
result, and the evaluation is performed in a separate step. This does
have the additional benefit of simplifying testing of the entire parsing
mechanics, as the [ast]{acronym-label="ast"
acronym-form="singular+abbrv"} can be easily inspected and compared to
the expected result.
