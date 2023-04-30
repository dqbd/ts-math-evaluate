import { Project, ts } from "ts-morph"
import path from "path"
import fs from "fs"

const mean = (samples: number[]) =>
  samples.reduce((sum, n) => sum + n, 0) / samples.length || 0

const variance = (samples: number[], mean: number) => {
  const result = samples.reduce((sum, n) => sum + (n - mean) ** 2, 0)
  return result / (samples.length - 1) || 0
}

const results = (samples: number[]) => {
  const meanSamples = mean(samples)
  const varianceSamples = variance(samples, meanSamples)

  return { mean: meanSamples, variance: varianceSamples }
}

function run(file: { name: string; contents: string }) {
  const project = new Project({
    compilerOptions: {
      noEmit: true,
      incremental: false,
      extendedDiagnostics: true,
    },
  })

  project.createSourceFile(file.name, file.contents)

  const performance = (ts as any).performance
  const program = project.getProgram().compilerObject

  performance.enable()
  project.emitSync()

  const instantiationCount = program.getInstantiationCount()
  const symbolCount = program.getSymbolCount()
  const checkTime = performance.getDuration("Check")

  performance.disable()

  return {
    instantiationCount,
    symbolCount,
    checkTime,
  }
}

function getSourceCases(sourceFilePath: string) {
  const project = new Project({
    compilerOptions: {
      noEmit: true,
      incremental: false,
      extendedDiagnostics: true,
    },
  })

  const sourceFile = project.addSourceFileAtPath(sourceFilePath)
  const declarations = sourceFile.getDescendantsOfKind(
    ts.SyntaxKind.TypeAliasDeclaration
  )
  const casesCode = declarations.map((i) => ({
    name: i.getFirstChildByKindOrThrow(ts.SyntaxKind.TypeReference).getText(),
    text: i.getText(),
  }))

  declarations.forEach((i) => i.remove())
  const restCode = sourceFile.getText()

  return casesCode.map((i, idx) => {
    const source = [restCode, i.text].join("\n")
    const filePath = path.join(
      path.dirname(sourceFilePath),
      idx + "." + path.basename(sourceFilePath)
    )
    return {
      name: i.name,
      file: { name: filePath, contents: source },
    }
  })
}

const targetFilePath = process.argv[2]

if (targetFilePath == null) throw new Error("Missing path")

const finalResult: Record<
  string,
  Record<string, { mean: number; variance: number }>
> = {}

for (const sourceFile of getSourceCases(targetFilePath)) {
  sourceFile.name

  const result: {
    instantiationCount: number[]
    symbolCount: number[]
    checkTime: number[]
  } = {
    instantiationCount: [],
    symbolCount: [],
    checkTime: [],
  }
  for (let i = -2; i < 10; ++i) {
    const sample = run(sourceFile.file)

    if (i >= 0) {
      result.instantiationCount.push(sample.instantiationCount)
      result.symbolCount.push(sample.symbolCount)
      result.checkTime.push(sample.checkTime)
    }
  }

  finalResult[sourceFile.name] = {
    instantiationCount: results(result.instantiationCount),
    symbolCount: results(result.symbolCount),
    checkTime: results(result.checkTime),
  }

  console.log(sourceFile.name)
  console.log(finalResult[sourceFile.name])
}

fs.writeFileSync(
  path.basename(targetFilePath) + ".json",
  JSON.stringify(finalResult, null, 2),
  { encoding: "utf-8" }
)
