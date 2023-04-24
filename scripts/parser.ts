import { outdent } from "outdent"
import { format } from "prettier"
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
  START -> ADD

  ADD -> MUL ADDx
  ADDx -> Token.Plus MUL ADDx
  ADDx -> Token.Minus ADDx
  ADDx ->

  MUL -> FACT MULx
  MULx -> Token.Multiply FACT MULx
  MULx -> Token.Divide FACT MULx
  MULx -> Token.Modulo FACT MULx
  MULx ->

  FACT -> UNARY FACTx
  FACTx -> Token.Factorial FACTx
  FACTx ->

  UNARY -> Token.Minus UNARY
  UNARY -> Token.Plus UNARY
  UNARY -> POW

  POW -> TERM POWx
  POWx -> Token.Power POW
  POWx ->

  TERM -> Token.UnaryFunction Token.LeftBracket ADD Token.RightBracket
  TERM -> Token.BinaryFunction Token.LeftBracket ADD Token.Comma ADD Token.RightBracket
  TERM -> Token.LeftBracket ADD Token.RightBracket
  TERM -> Token.Number
`
  .split("\n")
  .filter((i) => i.includes("->"))

const grammar = constructGrammar(sourceGrammar)

const NonTerminal = grammar.map((i) => i.left)
type NonTerminal = (typeof NonTerminal)[number]

type Terminal = string
type ParseSymbol = NonTerminal | Terminal

interface Production {
  left: string
  right: string[]
}

function isTerminal(symbol: ParseSymbol): symbol is Terminal {
  return !isNonTerminal(symbol)
}

function isNonTerminal(symbol: ParseSymbol): symbol is NonTerminal {
  return (NonTerminal as unknown as string[]).includes(symbol)
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

const parseTableNumber: Map<NonTerminal, Map<Terminal, number>> = new Map()

for (let i = 0; i < grammar.length; ++i) {
  const production = grammar[i]

  const nonTerminal = production.left
  const firstSet = first(production.right[0])

  for (const terminal of firstSet) {
    if (!parseTableNumber.has(nonTerminal)) {
      parseTableNumber.set(nonTerminal, new Map())
    }
    parseTableNumber.get(nonTerminal)?.set(terminal, i)
  }

  const followSet = follow(nonTerminal)
  if (firstSet.has(EOF)) {
    for (const terminal of followSet) {
      if (!parseTableNumber.has(nonTerminal)) {
        parseTableNumber.set(nonTerminal, new Map())
      }
      parseTableNumber.get(nonTerminal)?.set(terminal, i)
    }
  }
}

const parsingTableDebug = Object.fromEntries(
  [...parseTableNumber.entries()].map(([k, v]) => [
    k,
    Object.fromEntries([...v.entries()].map(([k, v]) => [k, v + 1])),
  ])
)

console.table(parsingTableDebug)

for (const nonTerminal of parseTableNumber.keys()) {
  // group terminals by rules
  const terminalRules = parseTableNumber.get(nonTerminal)!
  const rulesForTerminals = new Map<number, Set<Terminal>>()

  for (const [terminal, production] of terminalRules.entries()) {
    if (!rulesForTerminals.has(production)) {
      rulesForTerminals.set(production, new Set())
    }

    rulesForTerminals.get(production)?.add(terminal)
  }

  function getSmb(smb: string) {
    if (smb === "$") return "Token.EOF"
    return smb
  }

  let data = `type ${nonTerminal}<T extends Parser> = `

  for (const [productionIdx, terminals] of rulesForTerminals.entries()) {
    const production = grammar[productionIdx]

    const condition = `T["head"] extends ${[...terminals]
      .map((smb) => `${getSmb(smb)}`)
      .join(" | ")}`

    const rule = production.right
      .map((smb) => {
        if (smb === "$") return null

        if (isTerminal(smb)) {
          return `ConsumeParser<${getSmb(
            smb
          )}, T> extends infer T extends Parser`
        }

        return `${smb}<T> extends infer T extends Parser`
      })
      .reverse()
      .reduce<string>((memo, cond, idx, arr) => {
        if (cond === null) {
          return "T"
        }

        if (idx === 0) {
          return outdent`
            ${cond} 
              ? T 
              : Error.Parser
          `
        }

        return outdent`
          ${cond}
            ? ${memo}
            : Error.Parser
        `
      }, "")

    data += outdent`
      ${condition}
        ? ${rule}
        : 
    `
  }

  data += "Error.Parser"

  console.log(format(data, { parser: "typescript" }))
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
