const digit = Array(10)
  .fill(0)
  .map((_, i) => i)

// console.log(
//   JSON.stringify(
//     digit.map((x) => digit.map((y) => [(x + y) % 10, x + y >= 10])),
//     null,
//     2
//   )
// )

console.log(
  JSON.stringify(
    digit.map((x) => digit.map((y) => [(10 + (x - y)) % 10, (x - y) < 0]))
  )
)
