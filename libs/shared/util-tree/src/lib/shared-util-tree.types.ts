import { Sequence } from "@web-times-team/util-sequence";


export type Tree<T> = {
  readonly root: T;
  readonly forest: Forest<T>;
};

export type Forest<T> = Sequence<Tree<T>>;
