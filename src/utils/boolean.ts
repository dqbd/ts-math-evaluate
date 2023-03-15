export type Not<A extends boolean> = A extends true ? false : true

export type And<A extends boolean, B extends boolean> = A extends true
  ? B
  : false

export type Or<A extends boolean, B extends boolean> = A extends true
  ? true
  : B extends true
  ? true
  : false
export type Xor<A extends boolean, B extends boolean> = Or<
  And<A, Not<B>>,
  And<Not<A>, B>
>
