type BitAnd<A extends boolean, B extends boolean> = A extends true
  ? B extends true
    ? true
    : false
  : false
type BitOr<A extends boolean, B extends boolean> = A extends true
  ? true
  : B extends true
  ? true
  : false
type BitXor<A extends boolean, B extends boolean> = [A, B] extends
  | [true, false]
  | [false, true]
  ? true
  : false
