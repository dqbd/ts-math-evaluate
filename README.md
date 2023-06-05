![TS-Math-Evaluate](https://raw.githubusercontent.com/dqbd/ts-math-evaluate/main/assets/cover.svg)

# TS-Math-Evaluate

`ts-math-evaluate` is a type-level library for evaluating mathematical expressions in TypeScript, developed as a master thesis, implementing core mathematical operations and the accompanying evaluator, demonstrating the power of the TypeScript type system and the ability to perform complex meta-programming within the type system itself. 

A comprehensive guide to the TypeScript syntax and type-level programming techniques is provided to broaden the understanding of the capabilities of this language, seen [here (ctufit-thesis.pdf)](https://github.com/dqbd/ts-math-evaluate/blob/c7e71ed156ba0349e658ae805684cf46ecdc744d/thesis/ctufit-thesis.pdf). 

## Installation

```bash
npm install ts-math-evaluate
```

## Usage

```typescript
type Value = Evaluate<"3.1 + 2.5 * (1 - 5.6) / 4.2 + truncate(root(4, 2))! * -floor(1.5) + abs(-1) + ceil(root(4, 2))">
```

For full documentation, please visit [https://ts-math-evaluate.vercel.app/](https://ts-math-evaluate.vercel.app/).
