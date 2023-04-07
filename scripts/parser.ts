import { outdent } from "../node_modules/outdent/lib/index"

const EOF = "$"

function constructGrammar(rules: string[]) {
  return rules.map((rule) => {
    const [left, rules] = rule.split("->").map((i) => i.trim())
    const right = rules
      .split(" ")
      .map((i) => i.trim())
      .filter((i) => !!i)
    if (right.length === 0) right.push(EOF)

    return { left, right } as Production
  })
}

const sourceGrammar = outdent`
  S -> ADD

  ADD -> MUL ADDx
  ADDx -> + MUL ADDx
  ADDx -> - MUL ADDx
  ADDx ->

  MUL -> FACT MULx
  MULx -> * FACT MULx
  MULx -> / FACT MULx
  MULx -> % FACT MULx
  MULx ->

  FACT -> UNARY FACTx
  FACTx -> ! FACTx
  FACTx ->

  UNARY -> - UNARY
  UNARY -> + UNARY
  UNARY -> POW

  POW -> TERM POWx
  POWx -> ^ POW
  POWx ->

  TERM -> unary ( ADD )
  TERM -> binary ( ADD , ADD )
  TERM -> ( ADD )
  TERM -> number
`
  .split("\n")
  .filter((i) => i.includes("->"))

const grammar = constructGrammar(sourceGrammar)

console.log(grammar)

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
    followSet.add(EOF)
  }

  for (const production of grammar) {
    const index = production.right.indexOf(symbol)
    if (index !== -1) {
      for (let i = index + 1; i < production.right.length; i++) {
        const firstI = first(production.right[i])
        for (const t of firstI) followSet.add(t)
        if (!firstI.has(EOF)) {
          break
        }
      }

      if (
        index === production.right.length - 1 ||
        production.right.slice(index + 1).every((s) => first(s).has(EOF))
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

  const followSet = follow(nonTerminal)
  if (firstSet.has(EOF)) {
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

  if (!input.endsWith(EOF)) {
    input += EOF
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
