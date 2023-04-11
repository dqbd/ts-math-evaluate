import { Eval, Pipe } from "hotscript"
import { Math } from "./hotscript"

// $ExpectType "-445"
type PipeCase1 = Pipe<
  "123",
  [Math.Add<"345">, Math.Subtract<"23">, Math.Negate]
>

// $ExpectType "579"
type EvalCase1 = Eval<Math.Add<"123", "456">>
