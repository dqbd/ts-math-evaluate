import * as ts from "typescript"

function execute(fileNames: string[]): void {
  const performance = (ts as any).performance

  performance.enable()
  const program = ts.createProgram(fileNames, {
    noEmit: true,
    incremental: false,
    extendedDiagnostics: true,
  })
  program.emit()

  console.log(`Instantiation count: ${program.getInstantiationCount()}`)
  console.log(`Check time: ${performance.getDuration("Check")}`)
  performance.disable()
}

for (let i = 0; i < 10; ++i) {
  execute(process.argv.slice(2))
}
