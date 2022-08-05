export interface NaryNode<T> {
    element: T;
    children?:NaryNode<T>[];
  }
  