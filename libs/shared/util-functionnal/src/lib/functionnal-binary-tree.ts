import { BinaryNode } from '../interfaces/binary-node';
import { compose, equals, head, isEmpty, max, min, tail } from 'ramda';
import { removeOne } from './functionnal-general';
import {
  hasSameElements,
  hasSameSise,
  levelLinearizationByQueue,
} from './functionnal-sequences';

/**
 * binary tree depth
 * :: a -> b
 * @param node binary Tree node
 * @returns number
 */
export function binaryTreeDepth<T>(node: BinaryNode<T>): number {
  if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return 1 + binaryTreeDepth(node.leftChild as BinaryNode<T>);
  } else if (isUnaryRight(node)) {
    return 1 + binaryTreeDepth(node.rightChild as BinaryNode<T>);
  }
  return (
    1 +
    max(
      binaryTreeDepth(node.leftChild as BinaryNode<T>),
      binaryTreeDepth(node.rightChild as BinaryNode<T>)
    )
  );
}

/**
 * a, a -> b
 * @param binaryNode1
 * @param binaryNode2
 * @returns
 */
export function binaryTreesElementsIsEquals<T>(
  binaryNode1: BinaryNode<T> | undefined,
  binaryNode2: BinaryNode<T> | undefined
): boolean {
  return hasSameElements(
    prefixedLinearization(binaryNode1),
    prefixedLinearization(binaryNode2)
  );
}
/**
 * Recreate a binary tree from its prefixed and infixed linearization.
 * :: [a], [a] -> b
 * @param prefixedLinearization the binary tree prefixed Linearization
 * @param infixedLinearization the binary tree infixed Linearization
 */
export function binaryTreeFrom<T>(
  prefixedLinearization: Array<T>,
  infixedLinearization: Array<T>
): BinaryNode<T> | undefined {
  if (!hasSameSise(prefixedLinearization, infixedLinearization)) {
    throw new Error("arguments doesn't have same size");
  } else if (
    prefixedLinearization.length === 0 &&
    infixedLinearization.length === 0
  ) {
    return undefined;
  }
  const {
    root,
    binaryTreeLeftChildInfixedLinearization,
    binaryTreeRightChildInfixedLinearization,
    binaryTreeLeftChildInfixedLinearizationSize,
  } = binaryTreeInfixedLeftRightSequences(
    head(prefixedLinearization) as T,
    infixedLinearization
  );
  if (root === null) {
    throw new Error("arguments doesn't have same value");
  }

  const {
    binaryTreeLeftChildPrefixedLinearization,
    binaryTreeRightChildPrefixedLinearization,
  } = binaryTreePrefixedLeftRightSequences(
    binaryTreeLeftChildInfixedLinearizationSize,
    tail(prefixedLinearization)
  );

  return {
    root: root,
    leftChild: binaryTreeFrom(
      binaryTreeLeftChildPrefixedLinearization,
      binaryTreeLeftChildInfixedLinearization
    ),
    rightChild: binaryTreeFrom(
      binaryTreeRightChildPrefixedLinearization,
      binaryTreeRightChildInfixedLinearization
    ),
  };
}
/**
 * :: a, [a] -> <a, [a], [a], b>
 * @param elementRoot, element root of binary tree
 * @param infixedLinearization infixed Linearized BinaryTree
 * @returns
 */
export function binaryTreeInfixedLeftRightSequences<T>(
  elementRoot: T,
  infixedLinearization: Array<T>
): {
  root: T | null;
  binaryTreeLeftChildInfixedLinearization: Array<T>;
  binaryTreeRightChildInfixedLinearization: Array<T>;
  binaryTreeLeftChildInfixedLinearizationSize: number;
} {
  if (isEmpty(infixedLinearization)) {
    return {
      root: null,
      binaryTreeLeftChildInfixedLinearization: [],
      binaryTreeRightChildInfixedLinearization: [],
      binaryTreeLeftChildInfixedLinearizationSize: 0,
    };
  }

  const {
    root,
    binaryTreeLeftChildInfixedLinearization,
    binaryTreeRightChildInfixedLinearization,
    binaryTreeLeftChildInfixedLinearizationSize,
  } = binaryTreeInfixedLeftRightSequences(
    elementRoot,
    tail(infixedLinearization)
  );

  if (root === null && equals(elementRoot, head(infixedLinearization) as T)) {
    return {
      root: elementRoot,
      binaryTreeLeftChildInfixedLinearization: [
        ...binaryTreeLeftChildInfixedLinearization,
      ],
      binaryTreeRightChildInfixedLinearization: [
        ...binaryTreeRightChildInfixedLinearization,
      ],
      binaryTreeLeftChildInfixedLinearizationSize,
    };
  }

  if (root === null && !equals(elementRoot, head(infixedLinearization) as T)) {
    return {
      root: null,
      binaryTreeLeftChildInfixedLinearization: [
        ...binaryTreeLeftChildInfixedLinearization,
      ],
      binaryTreeRightChildInfixedLinearization: [
        head(infixedLinearization) as T,
        ...binaryTreeRightChildInfixedLinearization,
      ],
      binaryTreeLeftChildInfixedLinearizationSize,
    };
  }

  return {
    root: root,
    binaryTreeLeftChildInfixedLinearization: [
      head(infixedLinearization) as T,
      ...binaryTreeLeftChildInfixedLinearization,
    ],
    binaryTreeRightChildInfixedLinearization: [
      ...binaryTreeRightChildInfixedLinearization,
    ],
    binaryTreeLeftChildInfixedLinearizationSize:
      binaryTreeLeftChildInfixedLinearizationSize + 1,
  };
}

/**
 * a, [b] -> <[b],[b]>
 * @param size
 * @param prefixedLinearization
 * @returns
 */
export function binaryTreePrefixedLeftRightSequences<T>(
  size: number,
  prefixedLinearization: Array<T>
): {
  binaryTreeLeftChildPrefixedLinearization: Array<T>;
  binaryTreeRightChildPrefixedLinearization: Array<T>;
} {
  if (size === 0 && prefixedLinearization.length > 0) {
    return {
      binaryTreeLeftChildPrefixedLinearization: [],
      binaryTreeRightChildPrefixedLinearization: [...prefixedLinearization],
    };
  }

  if (size === 0 && prefixedLinearization.length === 0) {
    return {
      binaryTreeLeftChildPrefixedLinearization: [],
      binaryTreeRightChildPrefixedLinearization: [],
    };
  }
  const {
    binaryTreeLeftChildPrefixedLinearization,
    binaryTreeRightChildPrefixedLinearization,
  } = binaryTreePrefixedLeftRightSequences(
    size - 1,
    tail(prefixedLinearization)
  );
  return {
    binaryTreeLeftChildPrefixedLinearization: [
      head(prefixedLinearization) as T,
      ...binaryTreeLeftChildPrefixedLinearization,
    ],
    binaryTreeRightChildPrefixedLinearization:
      binaryTreeRightChildPrefixedLinearization,
  };
}
/**
 *
 * @param node
 * @param treeNode
 */
export function embelishLevelFor<T>(
  node: BinaryNode<T>,
  treeNode: BinaryNode<T> | undefined
): { hasNode: boolean; level: number } {
  if (isEmptyTree(treeNode)) {
    return { hasNode: false, level: 0 };
  } else if (isSingleton(treeNode)) {
    return equals(rootOf(node), rootOf(treeNode))
      ? { hasNode: true, level: 1 }
      : { hasNode: false, level: 0 };
  } else if (isUnaryLeft(treeNode)) {
    const { hasNode, level } = embelishLevelFor(node, leftChildOf(treeNode));
    return hasNode || equals(rootOf(node), rootOf(treeNode))
      ? { hasNode: true, level: level + 1 }
      : { hasNode: false, level: level };
  } else if (isUnaryRight(treeNode)) {
    const { hasNode, level } = embelishLevelFor(node, rightChildOf(treeNode));
    return hasNode || equals(rootOf(node), rootOf(treeNode))
      ? { hasNode: true, level: level + 1 }
      : { hasNode: false, level: level };
  }
  const { hasNode, level } = embelishLevelFor(node, leftChildOf(treeNode));
  if (hasNode) {
    return { hasNode, level: level + 1 };
  } else {
    const { hasNode, level } = embelishLevelFor(node, rightChildOf(treeNode));
    return hasNode || equals(rootOf(node), rootOf(treeNode))
      ? { hasNode: true, level: level + 1 }
      : { hasNode: false, level: level };
  }
}
/**
 * Predicate, check if the binary tree has a left child
 * :: a -> b
 * @param node  binary Tree node
 * @returns boolean
 */
export function existLeft<T>(node: BinaryNode<T>): boolean {
  return node.leftChild !== undefined;
}
/**
 * Predicate, check if the binary tree has a right child
 * :: a -> b
 * @param node binary Tree node
 * @returns boolean
 */
export function existRight<T>(node: BinaryNode<T>): boolean {
  return node.rightChild !== undefined;
}
/**
 * check if the binary tree has his two children
 * :: a -> b
 * @param node binary Tree node
 * @returns boolean
 */
export function hasHisTwoChildren<T>(node: BinaryNode<T>): boolean {
  return node.rightChild !== undefined && node.leftChild !== undefined;
}
/**
 * Infixed linearize binary tree
 * :: a -> b
 * @param node binary tree node 
 * @returns sequence of elements
 */
export function infixedLinearization<T>(
  node: BinaryNode<T> | undefined
): Array<T> {
  if (isEmptyTree(node)) {
    return [];
  }
  return [
    ...infixedLinearization(leftChildOf(node)),
    rootOf(node) as T,
    ...infixedLinearization(rightChildOf(node)),
  ];
}
/**
 * Predicate, check if binary tree is empty
 * :: a -> b
 * @param node binary tree node 
 * @returns boolean
 */
export function isEmptyTree<T>(
  node: BinaryNode<T> | null | undefined
): node is null | undefined {
  return node === null || node === undefined;
}

/**
 * :: a, a , a -> b
 * @param binaryNode
 * @param subNode1
 * @param subNode2
 * @returns
 */
export function isEqualToNearestOrder<T>(
  binaryNode: BinaryNode<T> | undefined,
  subNode1: BinaryNode<T>,
  subNode2: BinaryNode<T>
): boolean {
  if (isEmptyTree(binaryNode)) {
    return false;
  }

  return (
    equals(subNodeOf(rootOf(subNode1), binaryNode), subNode1) &&
    equals(subNodeOf(rootOf(subNode2), binaryNode), subNode2) &&
    levelFor(subNode1, binaryNode) === levelFor(subNode2, binaryNode)
  );
}
/**
 * 
 * @param node 
 * @returns 
 */
export function isSingleton<T>(node: BinaryNode<T>): boolean {
  return !node.leftChild && !node.rightChild;
}
/**
 * 
 * @param node 
 * @returns 
 */
export function isUnaryLeft<T>(node: BinaryNode<T>): boolean {
  return node.leftChild !== undefined && node.rightChild === undefined;
}
/**
 * 
 * @param node 
 * @returns 
 */
export function isUnaryRight<T>(node: BinaryNode<T>): boolean {
  return node.rightChild !== undefined && node.leftChild === undefined;
}

/**
 * a, a -> b
 * @param binaryNode1
 * @param binaryNode2
 * @returns
 */
export function isSameStructure<T>(
  binaryNode1: BinaryNode<T> | undefined,
  binaryNode2: BinaryNode<T> | undefined
): boolean {
  if (isEmptyTree(binaryNode1) && isEmptyTree(binaryNode2)) {
    return true;
  } else if (isEmptyTree(binaryNode1) && !isEmptyTree(binaryNode2)) {
    return false;
  } else if (!isEmptyTree(binaryNode1) && isEmptyTree(binaryNode2)) {
    return false;
  }
  return (
    isSameStructure(leftChildOf(binaryNode1), leftChildOf(binaryNode2)) &&
    isSameStructure(rightChildOf(binaryNode1), rightChildOf(binaryNode2))
  );
}
/**
 * 
 * @param node 
 * @returns 
 */
export function leftChildOf<T>(
  node: BinaryNode<T> | null | undefined
): BinaryNode<T> | undefined {
  if (isEmptyTree(node)) {
    return undefined;
  } else if (!node.leftChild) {
    return undefined;
  }
  return { ...node.leftChild };
}
/**
 *
 * @param node
 * @param treeNode
 * @returns
 */
export function levelFor<T>(
  node: BinaryNode<T>,
  treeNode: BinaryNode<T> | undefined | null
): number | null {
  const { hasNode, level } = embelishLevelFor(node, treeNode);
  return hasNode ? level : null;
}

/**
 * a -> b
 * @param node
 * @returns
 */
export function levelLinearization<T>(node: BinaryNode<T>): Array<T> {
  return levelLinearizationByQueue([node]);
}
/**
 *
 * @param node
 * @returns
 */
export function binaryTreeLeavesMinimumLevel<T>(node: BinaryNode<T>): number {
  if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return 1 + binaryTreeLeavesMinimumLevel(node.leftChild as BinaryNode<T>);
  } else if (isUnaryRight(node)) {
    return 1 + binaryTreeLeavesMinimumLevel(node.rightChild as BinaryNode<T>);
  }
  return (
    1 +
    min(
      binaryTreeLeavesMinimumLevel(node.leftChild as BinaryNode<T>),
      binaryTreeLeavesMinimumLevel(node.rightChild as BinaryNode<T>)
    )
  );
}
/**
 * :: element -> BinaryNode -> number
 * @param node Binary tree
 * @param element a element in the tree
 * @returns -1, if element is not in the tree
 */
export const numberOfDescendantsOf = compose(
  removeOne,
  numberOfNodes,
  subNodeOf
);

/**
 *
 * @param node
 * @returns
 */
export function numberOfLeaves<T>(node: BinaryNode<T> | undefined): number {
  if (isEmptyTree(node)) {
    return 0;
  } else if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return numberOfLeaves<T>(node.leftChild);
  } else if (isUnaryRight(node)) {
    return numberOfLeaves(node.rightChild);
  }
  return numberOfLeaves(node.leftChild) + numberOfLeaves(node.rightChild);
}
/**
 *
 * @param node
 * @returns
 */
export function numberOfNodes<T>(node: BinaryNode<T> | undefined): number {
  if (isEmptyTree(node)) {
    return 0;
  } else if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return 1 + numberOfNodes<T>(node.leftChild);
  } else if (isUnaryRight(node)) {
    return 1 + numberOfNodes(node.rightChild);
  }
  return numberOfNodes(node.leftChild) + 1 + numberOfNodes(node.rightChild);
}

/**
 *:: a -> [b]
 * @param binaryNode
 * @returns
 */
export function prefixedLinearization<T>(
  binaryNode: BinaryNode<T> | undefined
): Array<T> {
  if (isEmptyTree(binaryNode)) {
    return [];
  }
  return [
    rootOf(binaryNode) as T,
    ...prefixedLinearization(leftChildOf(binaryNode)),
    ...prefixedLinearization(rightChildOf(binaryNode)),
  ];
}
/**
 * :: a -> [b]
 * @param binaryNode
 * @returns
 */
export function postfixedLinearization<T>(
  binaryNode: BinaryNode<T> | undefined
): Array<T> {
  if (isEmptyTree(binaryNode)) {
    return [];
  }
  return [
    ...postfixedLinearization(leftChildOf(binaryNode)),
    ...postfixedLinearization(rightChildOf(binaryNode)),
    rootOf(binaryNode) as T,
  ];
}
/**
 *
 * @param node
 * @returns
 */
export function rightChildOf<T>(
  node: BinaryNode<T> | null | undefined
): BinaryNode<T> | undefined {
  if (isEmptyTree(node)) {
    return undefined;
  } else if (!node.rightChild) {
    return undefined;
  }
  return { ...node.rightChild };
}
/**
 *
 * @param node
 * @returns
 */
export function rootOf<T>(
  node: BinaryNode<T> | null | undefined
): T | undefined {
  if (isEmptyTree(node)) {
    return undefined;
  }

  return node.root; // TODO: type generic immutable
}

/**
 * :: element -> BinaryNode -> BinaryNode
 * @param element
 * @param node
 * @returns undefined if element is not in the tree
 */
export function subNodeOf<T>(
  element: T,
  node: BinaryNode<T>
): BinaryNode<T> | undefined {
  if (isEmptyTree(node)) {
    return undefined;
  } else if (isSingleton<T>(node)) {
    return equals(rootOf(node), element) ? { ...node } : undefined;
  } else if (isUnaryLeft(node)) {
    return equals(rootOf(node), element)
      ? { ...node }
      : subNodeOf<T>(element, node.leftChild as BinaryNode<T>);
  } else if (isUnaryRight(node)) {
    return equals(rootOf(node), element)
      ? { ...node }
      : subNodeOf<T>(element, node.rightChild as BinaryNode<T>);
  }

  if (equals(rootOf(node), element)) {
    return { ...node };
  }
  const subTree = subNodeOf(element, node.leftChild as BinaryNode<T>);
  return isEmptyTree(subTree)
    ? subNodeOf(element, node.rightChild as BinaryNode<T>)
    : subTree;
}
