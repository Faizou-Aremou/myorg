export type BinaryTree<T> = {
  readonly root: T;
  readonly leftChild?: BinaryTree<T>;
  readonly rightChild?: BinaryTree<T>;
};

export type TheRoot = <T>(
  node: BinaryTree<T> | null | undefined
) => T | undefined;

export type TheLeftChild<T> = (
  node: BinaryTree<T> | null | undefined
) => BinaryTree<T> | undefined;

export type TheRightChild<T> = (
  node: BinaryTree<T> | null | undefined
) => BinaryTree<T> | undefined;
