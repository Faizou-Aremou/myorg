import { Forest } from "./forest";

export interface Tree<T> {
    root: T;
    forest:Forest<T>;
  }
  