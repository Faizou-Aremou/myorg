import { BinaryNode } from '../interfaces/binary-node';
import { compose, equals, head, isEmpty, max, min, tail } from 'ramda';
import { removeOne } from './functionnal-general';
import {
  hasSameElements,
  hasSameSise,
  levelLinearizationByQueue,
} from './functionnal-sequences';

/**
 * ::[a], [a] -> b
 * @param prefixedSequence
 * @param infixedSequence
 */
export function binaryNodeFrom<T>(
  prefixedSequence: Array<T>,
  infixedSequence: Array<T>
): BinaryNode<T> | undefined {
  if (!hasSameSise(prefixedSequence, infixedSequence)) {
    throw new Error("arguments doesn't have same size");
  } else if (prefixedSequence.length === 0 && infixedSequence.length === 0) {
    return undefined;
  }
  const {
    root,
    leftChildOfInfixedSequence,
    rightChildOfInfixedSequence,
    leftChildOfInfixedSequenceSize,
  } = infixedBinaryTreeSequences(head(prefixedSequence) as T, infixedSequence);
  if (root === null) {
    throw new Error("arguments seems doesn't have same value");
  }

  const { leftChildOfPrefixedSequence, rightChildOfPrefixedSequence } =
    prefixedBinaryNodeSequences(
      leftChildOfInfixedSequenceSize,
      tail(prefixedSequence)
    );

  return {
    root: root,
    leftChild: binaryNodeFrom(
      leftChildOfPrefixedSequence,
      leftChildOfInfixedSequence
    ),
    rightChild: binaryNodeFrom(
      rightChildOfPrefixedSequence,
      rightChildOfInfixedSequence
    ),
  };
}

/**
 *
 * @param node
 * @returns
 */
export function depthOfTheBinaryTree<T>(node: BinaryNode<T>): number {
  if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return 1 + depthOfTheBinaryTree(node.leftChild as BinaryNode<T>);
  } else if (isUnaryRight(node)) {
    return 1 + depthOfTheBinaryTree(node.rightChild as BinaryNode<T>);
  }
  return (
    1 +
    max(
      depthOfTheBinaryTree(node.leftChild as BinaryNode<T>),
      depthOfTheBinaryTree(node.rightChild as BinaryNode<T>)
    )
  );
}
/**
 * ::[a] -> [b]
 */
export function existLeft<T>(node: BinaryNode<T>): boolean {
  return node.leftChild !== undefined;
}
/**
 * ::[a] -> [b]
 */
export function existRight<T>(node: BinaryNode<T>): boolean {
  return node.rightChild !== undefined;
}
/**
 *
 * @param node
 * @returns
 */
export function hasHisTwoChildren<T>(node: BinaryNode<T>): boolean {
  return node.rightChild !== undefined && node.leftChild !== undefined;
}
/**
 * ::a, [a] -> <a, [a], [a], b>
 * @param elementRoot, element root of binary tree
 * @param infixedLinearizedBinaryTree infixed Linearized BinaryTree
 * @returns
 */
export function infixedBinaryTreeSequences<T>(
  elementRoot: T,
  infixedLinearizedBinaryTree: Array<T>
): {
  root: T | null;
  leftChildOfInfixedSequence: Array<T>;
  rightChildOfInfixedSequence: Array<T>;
  leftChildOfInfixedSequenceSize: number;
} {
  if (isEmpty(infixedLinearizedBinaryTree)) {
    return {
      root: null,
      leftChildOfInfixedSequence: [],
      rightChildOfInfixedSequence: [],
      leftChildOfInfixedSequenceSize: 0,
    };
  }

  const {
    root,
    leftChildOfInfixedSequence,
    rightChildOfInfixedSequence,
    leftChildOfInfixedSequenceSize,
  } = infixedBinaryTreeSequences(
    elementRoot,
    tail(infixedLinearizedBinaryTree)
  );

  if (
    root === null &&
    equals(elementRoot, head(infixedLinearizedBinaryTree) as T)
  ) {
    return {
      root: elementRoot,
      leftChildOfInfixedSequence: [...leftChildOfInfixedSequence],
      rightChildOfInfixedSequence: [...rightChildOfInfixedSequence],
      leftChildOfInfixedSequenceSize: leftChildOfInfixedSequenceSize,
    };
  }

  if (
    root === null &&
    !equals(elementRoot, head(infixedLinearizedBinaryTree) as T)
  ) {
    return {
      root: null,
      leftChildOfInfixedSequence: [...leftChildOfInfixedSequence],
      rightChildOfInfixedSequence: [
        head(infixedLinearizedBinaryTree) as T,
        ...rightChildOfInfixedSequence,
      ],
      leftChildOfInfixedSequenceSize: leftChildOfInfixedSequenceSize,
    };
  }

  return {
    root: root,
    leftChildOfInfixedSequence: [
      head(infixedLinearizedBinaryTree) as T,
      ...leftChildOfInfixedSequence,
    ],
    rightChildOfInfixedSequence: [...rightChildOfInfixedSequence],
    leftChildOfInfixedSequenceSize: leftChildOfInfixedSequenceSize + 1,
  };
}

/**
 *
 * @param binaryNode
 * @returns
 */
export function infixedLinearization<T>(
  binaryNode: BinaryNode<T> | undefined
): Array<T> {
  if (isEmptyTree(binaryNode)) {
    return [];
  }
  return [
    ...infixedLinearization(leftChildOf(binaryNode)),
    rootOf(binaryNode) as T,
    ...infixedLinearization(rightChildOf(binaryNode)),
  ];
}

/**
 *
 * @param node
 * @returns
 */
export function isEmptyTree<T>(
  node: BinaryNode<T> | null | undefined
): node is null | undefined {
  return node === null || node === undefined;
}

/**
 * a, a -> b
 * @param binaryNode1
 * @param binaryNode2
 * @returns
 */
export function isEqualityOfSetsStructuredAsTree<T>(
  binaryNode1: BinaryNode<T> | undefined,
  binaryNode2: BinaryNode<T> | undefined
): boolean {
  return hasSameElements(
    prefixedLinearization(binaryNode1),
    prefixedLinearization(binaryNode2)
  );
}

/**
 * a, a , a -> b
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

export function isSingleton<T>(node: BinaryNode<T>): boolean {
  return !node.leftChild && !node.rightChild;
}
export function isUnaryLeft<T>(node: BinaryNode<T>): boolean {
  return node.leftChild !== undefined && node.rightChild === undefined;
}

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
export function minimumLevelOfLeaves<T>(node: BinaryNode<T>): number {
  if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return 1 + minimumLevelOfLeaves(node.leftChild as BinaryNode<T>);
  } else if (isUnaryRight(node)) {
    return 1 + minimumLevelOfLeaves(node.rightChild as BinaryNode<T>);
  }
  return (
    1 +
    min(
      minimumLevelOfLeaves(node.leftChild as BinaryNode<T>),
      minimumLevelOfLeaves(node.rightChild as BinaryNode<T>)
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
 * a, [b] -> <[b],[b]>
 * @param size
 * @param sequence
 * @returns
 */
export function prefixedBinaryNodeSequences<T>(
  size: number,
  sequence: Array<T>
): {
  leftChildOfPrefixedSequence: Array<T>;
  rightChildOfPrefixedSequence: Array<T>;
} {
  if (size === 0 && sequence.length > 0) {
    return {
      leftChildOfPrefixedSequence: [],
      rightChildOfPrefixedSequence: [...sequence],
    };
  }

  if (size === 0 && sequence.length === 0) {
    return {
      leftChildOfPrefixedSequence: [],
      rightChildOfPrefixedSequence: [],
    };
  }
  const { leftChildOfPrefixedSequence, rightChildOfPrefixedSequence } =
    prefixedBinaryNodeSequences(size - 1, tail(sequence));
  return {
    leftChildOfPrefixedSequence: [
      head(sequence) as T,
      ...leftChildOfPrefixedSequence,
    ],
    rightChildOfPrefixedSequence,
  };
}

/**
 * a -> [b]
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
 * a -> [b]
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
