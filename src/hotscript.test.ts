import { Pipe } from "hotscript"
import { Math } from "./hotscript"

// $ExpectType "-445"
type X = Pipe<"123", [Math.Add<"345">, Math.Subtract<"23">, Math.Negate]>
