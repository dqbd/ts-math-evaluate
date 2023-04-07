import { outdent } from "../node_modules/outdent/lib/index"

function constructGrammar(rules: string[]) {
  return rules.map((rule) => {
    const [left, right] = rule.split("->").map((i) => i.trim())
    return { left, right: right.split(" ").map((i) => i.trim()) } as Production
  })
}

const sourceGrammar = outdent`
  S -> ADD
  ADD -> MUL ADDp
  ADDp -> + MUL ADDp
  ADDp -> - MUL ADDp
  ADDp -> $
  MUL -> POW MULp
  MULp -> * POW MULp
  MULp -> / POW MULp
  MULp -> % POW MULp
  MULp -> $
  POW -> FN POWp
  POWp -> ^ FN POWp
  POWp -> $
  FN -> abs ( FACT )
  FN -> ceil ( FACT )
  FN -> floor ( FACT )
  FN -> round ( FACT )
  FN -> truncate ( FACT )
  FN -> root ( FACT , FACT )
  FN -> FACT
  FACT -> NEG FACTp
  FACTp -> ! FACTp
  FACTp -> $
  NEG -> - NEG
  NEG -> + NEG
  NEG -> TERM
  TERM -> ( ADD )
  TERM -> NUMBER
  NUMBER -> 0
  NUMBER -> 1
  NUMBER -> 2
  NUMBER -> 3
  NUMBER -> 4
  NUMBER -> 5
  NUMBER -> 6
  NUMBER -> 7
  NUMBER -> 8
  NUMBER -> 9
`.split("\n")

const grammar = constructGrammar(sourceGrammar)

const NonTerminal = grammar.map((i) => i.left)
type NonTerminal = (typeof NonTerminal)[number]

type Terminal = string

type ParseSymbol = NonTerminal | Terminal

interface Production {
  left: string
  right: string[]
}

function first(
  symbol: ParseSymbol,
  visited: Set<ParseSymbol> = new Set()
): Set<Terminal> {
  if (isTerminal(symbol)) {
    return new Set([symbol])
  }

  if (visited.has(symbol)) {
    return new Set()
  }

  visited.add(symbol)
  const firstSet = new Set<Terminal>()
  for (const production of grammar) {
    if (production.left === symbol) {
      for (const s of production.right) {
        const firstS = first(s, visited)

        for (const t of firstS) firstSet.add(t)
        if (!firstS.has("$")) {
          break
        }
      }
    }
  }

  return firstSet
}

function follow(
  symbol: NonTerminal,
  visited: Set<ParseSymbol> = new Set()
): Set<Terminal> {
  if (visited.has(symbol)) {
    return new Set()
  }
  visited.add(symbol)

  const followSet = new Set<Terminal>()
  if (symbol === "S") {
    followSet.add("$")
  }

  for (const production of grammar) {
    const index = production.right.indexOf(symbol)
    if (index !== -1) {
      for (let i = index + 1; i < production.right.length; i++) {
        const firstI = first(production.right[i])
        for (const t of firstI) followSet.add(t)
        if (!firstI.has("$")) {
          break
        }
      }

      if (
        index === production.right.length - 1 ||
        production.right.slice(index + 1).every((s) => first(s).has("$"))
      ) {
        const x = follow(production.left, visited)
        for (const t of x) followSet.add(t)
      }
    }
  }

  return followSet
}

const parseTable: Map<NonTerminal, Map<Terminal, Production>> = new Map()

for (const production of grammar) {
  const nonTerminal = production.left
  const firstSet = first(production.right[0])

  for (const terminal of firstSet) {
    if (!parseTable.has(nonTerminal)) {
      parseTable.set(nonTerminal, new Map())
    }
    parseTable.get(nonTerminal)?.set(terminal, production)
  }

  if (firstSet.has("$")) {
    const followSet = follow(nonTerminal)

    for (const terminal of followSet) {
      if (!parseTable.has(nonTerminal)) {
        parseTable.set(nonTerminal, new Map())
      }
      parseTable.get(nonTerminal)?.set(terminal, production)
    }
  }
}

function parse(input: string): void {
  const stack: ParseSymbol[] = ["S"]
  let index = 0

  if (!input.endsWith("$")) {
    input += "$"
  }

  while (stack.length > 0) {
    const lookahead = input[index]
    const top = stack.shift()!

    if (isTerminal(top)) {
      if (top !== "$") {
        if (top === input[index]) {
          index++
        } else {
          throw new Error(
            `Unexpected symbol at position ${index}: "${lookahead}"`
          )
        }
      }
    } else if (isNonTerminal(top)) {
      const production = parseTable.get(top)?.get(lookahead as Terminal)

      if (production) {
        for (let i = production.right.length - 1; i >= 0; i--) {
          stack.unshift(production.right[i])
        }
      } else {
        throw new Error(
          `No production rule for non-terminal ${top} with lookahead ${lookahead} at position ${index}`
        )
      }
    }
  }
}

function isTerminal(symbol: ParseSymbol): symbol is Terminal {
  return !isNonTerminal(symbol)
}

function isNonTerminal(symbol: ParseSymbol): symbol is NonTerminal {
  return (NonTerminal as unknown as string[]).includes(symbol)
}

const input = parse("2!!!!")

console.log(parseTable)
