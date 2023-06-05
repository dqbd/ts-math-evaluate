![TS-Math-Evaluate](https://raw.githubusercontent.com/dqbd/ts-math-evaluate/main/assets/cover.svg)

# TS-Math-Evaluate

`ts-math-evaluate` is a type-level library for evaluating mathematical expressions in TypeScript, developed as a master thesis, implementing core mathematical operations and the accompanying evaluator, demonstrating the power of the TypeScript type system and the ability to perform complex meta-programming within the type system itself. 

Alongside the evaluator, the expression parser and the accompanying parser generator can accept any LL(1) grammar and can be used to parse more complex formats, such as JSON. Finally, a benchmarking tool is provided, which can be used to benchmark any type-level code in isolation, keeping all the test cases in a single file.

A comprehensive guide to the TypeScript syntax and type-level programming techniques is provided to broaden the understanding of the capabilities of this language, seen [here (ctufit-thesis.pdf)](https://github.com/dqbd/ts-math-evaluate/blob/c7e71ed156ba0349e658ae805684cf46ecdc744d/thesis/ctufit-thesis.pdf). 

## Installation

```bash
npm install ts-math-evaluate
```

## Usage

```typescript
import type { Evaluate } from "ts-math-evaluate"

type Basic = Evaluate<
  "3.1 + 2.5 * (1 - 5.6) / 4.2"
>

type Advanced = Evaluate<
  "truncate(root(4, 2))! * -floor(1.5) + abs(-1) + ceil(root(4, 2))"
>
```

For full documentation, please visit [https://ts-math-evaluate.vercel.app/](https://ts-math-evaluate.vercel.app/).
