export type BinaryTree<T> = {
    readonly root: T;
    readonly leftChild?: BinaryTree<T>;
    readonly rightChild?: BinaryTree<T>;
  };