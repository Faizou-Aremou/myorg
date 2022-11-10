export type BinaryTree<T> = {
  readonly root: T;
  readonly leftChild?: BinaryTree<T>;
  readonly rightChild?: BinaryTree<T>;
};

export type BinaryRootTree<T> = {
  readonly root: T;
  readonly leftChild: BinaryTree<T>;
  readonly rightChild: BinaryTree<T>;
};

export type LeftUnaryRootNode<T> = {
  readonly root: T;
  readonly leftChild: BinaryTree<T>;
  readonly rightChild: undefined;
};

export type RightUnaryRootNode<T> = {
  readonly root: T;
  readonly leftChild: undefined;
  readonly rightChild: BinaryTree<T>;
};

export type TheBinaryTree = <T>(
  root: T,
  leftChild?: BinaryTree<T>,
  rightChild?: BinaryTree<T>
) => BinaryTree<T>;

export type theBinaryRootTree = <T>(
  root: T,
  leftChild: BinaryTree<T>,
  rightChild: BinaryTree<T>
) => BinaryRootTree<T>;

export type TheRoot = <T>(
  node: BinaryTree<T> | null | undefined
) => T | undefined;

export type TheLeftChild<T> = (
  node: BinaryTree<T> | null | undefined
) => BinaryTree<T> | undefined;

export type TheRightChild<T> = (
  node: BinaryTree<T> | null | undefined
) => BinaryTree<T> | undefined;

export type AreTwoBinaryTreesSymmetricalToEachOther = <T>(
  leftTree: BinaryTree<T> | undefined,
  rightTree: BinaryTree<T> | undefined
) => boolean;

export type BothBinaryTreesAreEmpty = <T>(
  firstBinaryTree: BinaryTree<T> | undefined,
  secondBinaryTree: BinaryTree<T> | undefined
) => boolean;
export type SecondBinaryTreeisEmptyInDoublet = <T>(
  firstBinaryTree: BinaryTree<T> | undefined,
  secondBinaryTree: BinaryTree<T> | undefined
) => boolean;
export type FirstBinaryTreeisEmptyInDoublet = <T>(
  firstBinaryTree: BinaryTree<T> | undefined,
  secondBinaryTree: BinaryTree<T> | undefined
) => boolean;

export type IsBinaryRootNode = <T>(tree: BinaryTree<T>) => boolean;
