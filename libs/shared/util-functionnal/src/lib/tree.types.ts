import { Sequence } from './sequence.types';

export type Tree<T> = {
  readonly root: T;
  readonly forest: Forest<T>;
};

export type Forest<T> = Sequence<Tree<T>>;
