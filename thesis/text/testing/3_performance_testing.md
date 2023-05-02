# Performance testing

Advanced utility types do have a significant strain on type checking and can have a negative impact on the developer experience with worse latency of language services and longer build times when building with `tsc`. The performance test suite has been created to measure the impact of various implemented math operations on type-checking performance.

Two metrics are measured in the performance test suite: the obtained from extended diagnostics when compiling via `tsc` and the number of type instantiations performed when evaluating utility types. These metrics can be obtained from the `tsc` [cli]{acronym-label="cli" acronym-form="singular+abbrv"} with the `--extendedDiagnostics` flag. However, the TypeScript API does expose an internal `performance` singleton, which, combined with internal `extendedDiagnostics` flag and Compiler [api]{acronym-label="api" acronym-form="singular+abbrv"}, can be used to obtain the same metrics programmatically, as seen in Listing [\[lst:performance-metrics\]](#lst:performance-metrics).

<div class="listing">

``` TypeScript
import * as ts from "typescript"
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
```

</div>

Together with `ts-morph` library [@sherretTsmorph2023] and the insights from the Compiler [api]{acronym-label="api" acronym-form="singular+abbrv"}, a benchmarking tool was created, found in `scripts/bench.ts`. `ts-morph` is a wrapper around the Compiler [api]{acronym-label="api" acronym-form="singular+abbrv"} that provides convenient methods for setup, navigation and manipulation of the TypeScript [ast]{acronym-label="ast" acronym-form="singular+abbrv"}. The benchmarking tool accepts a path to a benchmarking file and parses the file into an [ast]{acronym-label="ast" acronym-form="singular+abbrv"}. Each test case of a benchmark file is denoted as an exported type alias, which is read by the benchmarking tool. The tool then creates a new separate valid TypeScript code for each test case, containing just the benchmark type alias, omitting all other unnecessary types and constructs. The evaluation of a test case follows the same logic as described in Listing [\[lst:performance-metrics\]](#lst:performance-metrics). The tool performs multiple measurement iterations, and both the mean and variance are calculated for each metric. At the time of writing, the benchmarking tool performs twelve iterations in total, with two iterations being warmup iterations. The idea of warmup iterations is to increase the likelihood of the JavaScript engine deciding to optimise the interpreted code.

In order to measure the impact of the library on type checking, some mathematical operations were selected for benchmarking: `Add`, `Multiply`, `Divide` and `Root`, ordered by the increasing computational complexity. As shown in Figure [1](#fig:instantiation-count), the number of type instantiations proportionally increases with the digit length. As expected, `Root`, the most complex operations of the selected few, creates an order of magnitude more type instantiations than other operations.

<div id="fig:instantiation-count" class="figure">

<div class="caption">

Comparison of instantiation count for selected operations

</div>

</div>

However, when comparing the actual time spent by the type checker, there does not seem to be a strong indication of performance degradation when comparing check times between `Add`, `Multiply` and `Divide`. Only the `Root` operation does seem to have a significant negative impact on the type-checking performance. This requires further investigation out of the scope of this thesis. However, there does seem to be a significant performance hit when the number of type instantiations is in the scale of millions. For full benchmarking results, refer to the Table [\[tab:appendix:add\]](#tab:appendix:add), Table [\[tab:appendix:multiply\]](#tab:appendix:multiply), Table [\[tab:appendix:divide\]](#tab:appendix:divide), and Table [\[tab:appendix:root\]](#tab:appendix:root).

<div id="fig:check-time" class="figure">

<div class="caption">

Comparison of time spent type checking between selected operations

</div>

</div>
