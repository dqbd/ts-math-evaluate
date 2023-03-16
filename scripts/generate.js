const fs = require("fs")
const path = require("path")
const prettier = require("prettier")

const digit = Array(10)
  .fill(0)
  .map((_, i) => i)

const addMapCarry = digit.map((x) =>
  digit.map((y) => [(x + y) % 10, x + y >= 10])
)

const subMapCarry = digit.map((x) =>
  digit.map((y) => [(10 + (x - y)) % 10, x - y < 0])
)

const mulMapCarry = digit.map((x) =>
  digit.map((y) => [(x * y) % 10, Math.floor((x * y) / 10)])
)

const cmpDigitMap = digit.map((x) => digit.map((y) => Math.sign(x - y)))

fs.writeFileSync(
  path.resolve(__dirname, "../src/utils/map.ts"),
  prettier.format(
    `export type AddMapCarry = ${JSON.stringify(addMapCarry)}
    export type SubMapCarry = ${JSON.stringify(subMapCarry)}
    export type CmpMap = ${JSON.stringify(cmpDigitMap)}`,
    { semi: false, parser: "babel-ts" }
  ),
  { encoding: "utf-8" }
)
