import { LevelPresence, removeOne } from '@web-times-team/util-functionnal';
import { Integer } from '@web-times-team/util-number';
import { hasSameElements, hasSameSise } from '@web-times-team/util-sequence';
import {
  append,
  compose,
  equals,
  head,
  isEmpty,
  max,
  min,
  prepend,
  tail,
} from 'ramda';
import {
  AreTwoBinaryTreesSymmetricalToEachOther,
  AreBothBinaryTreesEmpty,
  BinaryTree,
  IsFirstBinaryTreeEmpty,
  IsBinaryRootNode,
  IsSecondBinaryTreeEmpty,
  TheRoot,
  CreateSymetricalOfBinaryTree,
  TheBinaryTree,
  ElementsEqualTo,
  AreAllElementsEquals,
} from './binary-tree.types';

/**
 *
 * @param node
 * @returns
 */
export const theRoot: TheRoot = <T>(node: BinaryTree<T> | null | undefined) => {
  if (isEmptyTree(node)) {
    return undefined;
  }

  return node.root;
};
export const theBinaryTree: TheBinaryTree = <T>(
  root: T,
  leftChild?: BinaryTree<T>,
  rightChild?: BinaryTree<T>
) => {
  return { root, leftChild, rightChild } as BinaryTree<T>;
};

/**
 *
 * @param node
 * @returns
 */
export function theLeftChild<T>(
  node: BinaryTree<T> | null | undefined
): BinaryTree<T> | undefined {
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
 * @returns
 */
export function theRightChild<T>(
  node: BinaryTree<T> | null | undefined
): BinaryTree<T> | undefined {
  if (isEmptyTree(node)) {
    return undefined;
  } else if (!node.rightChild) {
    return undefined;
  }
  return { ...node.rightChild };
}

/**
 *
 */
export const areAllElementsEquals: AreAllElementsEquals = <T>(
  tree: BinaryTree<T>
) => {
  if (isSingleton(tree)) {
    return true;
  } else if (isUnaryLeft(tree)) {
    return elementsEqualTo(theRoot(tree), theLeftChild(tree));
  } else if (isUnaryRight(tree)) {
    return elementsEqualTo(theRoot(tree), theRightChild(tree));
  }

  return (
    elementsEqualTo(theRoot(tree), theLeftChild(tree)) &&
    elementsEqualTo(theRoot(tree), theRightChild(tree))
  );
};

export const elementsEqualTo: ElementsEqualTo = <T>(
  element: T,
  tree: BinaryTree<T>
) => {
  if (isSingleton(tree)) {
    return equals(theRoot(tree), element);
  } else if (isUnaryLeft(tree)) {
    return (
      equals(theRoot(tree), element) &&
      elementsEqualTo(element, theLeftChild(tree))
    );
  } else if (isUnaryRight(tree)) {
    return (
      equals(theRoot(tree), element) &&
      elementsEqualTo(element, theRightChild(tree))
    );
  }
  return (
    equals(theRoot(tree), element) &&
    elementsEqualTo(element, theLeftChild(tree)) &&
    elementsEqualTo(element, theRightChild(tree))
  );
};
/**
 * :: BinaryTree -> BinaryTree -> boolean
 * @param leftTree BinaryTree<T> | undefined
 * @param rightTree  BinaryTree<T> | undefined
 * @returns true if the two tree are symetrical
 */
export const areTwoBinaryTreesSymmetricalToEachOther: AreTwoBinaryTreesSymmetricalToEachOther =
  <T>(
    leftTree: BinaryTree<T> | undefined,
    rightTree: BinaryTree<T> | undefined
  ) => {
    if (
      areBothBinaryTreesEmpty(leftTree, rightTree) ||
      isFirstBinaryTreeisEmpty(leftTree, rightTree) ||
      isSecondBinaryTreeEmpty(leftTree, rightTree) ||
      (isSingleton(leftTree) && isBinaryRootNode(rightTree)) ||
      (isSingleton(leftTree) && isUnaryLeft(rightTree)) ||
      (isSingleton(leftTree) && isUnaryRight(rightTree)) ||
      (isUnaryLeft(leftTree) && isSingleton(rightTree)) ||
      (isUnaryLeft(leftTree) && isUnaryLeft(rightTree)) ||
      (isUnaryLeft(leftTree) && isBinaryRootNode(rightTree)) ||
      (isUnaryRight(leftTree) && isSingleton(rightTree)) ||
      (isUnaryRight(leftTree) && isUnaryRight(rightTree)) ||
      (isUnaryRight(leftTree) && isBinaryRootNode(rightTree)) ||
      (isBinaryRootNode(leftTree) && isSingleton(rightTree)) ||
      (isBinaryRootNode(leftTree) && isUnaryLeft(rightTree)) ||
      (isBinaryRootNode(leftTree) && isUnaryRight(rightTree))
    ) {
      return false;
    } else if (isSingleton(leftTree) && isSingleton(rightTree)) {
      return equals(theRoot(leftTree), theRoot(rightTree));
    } else if (isUnaryLeft(leftTree) && isUnaryRight(rightTree)) {
      return (
        equals(theRoot(leftTree), theRoot(rightTree)) &&
        areTwoBinaryTreesSymmetricalToEachOther(
          theLeftChild(leftTree),
          theRightChild(rightTree)
        )
      );
    } else if (isUnaryRight(leftTree) && isUnaryLeft(rightTree)) {
      return (
        equals(theRoot(leftTree), theRoot(rightTree)) &&
        areTwoBinaryTreesSymmetricalToEachOther(
          theRightChild(leftTree),
          theLeftChild(rightTree)
        )
      );
    }
    return (
      equals(theRoot(leftTree), theRoot(rightTree)) &&
      areTwoBinaryTreesSymmetricalToEachOther(
        theLeftChild(leftTree),
        theRightChild(rightTree)
      ) &&
      areTwoBinaryTreesSymmetricalToEachOther(
        theRightChild(leftTree),
        theLeftChild(rightTree)
      )
    );
  };
/**
 *
 * @param firstBinaryTree
 * @param secondBinaryTree
 * @returns
 */
export const areBothBinaryTreesEmpty: AreBothBinaryTreesEmpty = <T>(
  firstBinaryTree: BinaryTree<T> | undefined,
  secondBinaryTree: BinaryTree<T> | undefined
) => {
  return isEmptyTree(firstBinaryTree) && isEmptyTree(secondBinaryTree);
};
/**
 *
 * @param firstBinaryTree
 * @param secondBinaryTree
 * @returns
 */
export const isFirstBinaryTreeisEmpty: IsFirstBinaryTreeEmpty = <T>(
  firstBinaryTree: BinaryTree<T> | undefined,
  secondBinaryTree: BinaryTree<T> | undefined
) => {
  return isEmptyTree(firstBinaryTree) && !isEmptyTree(secondBinaryTree);
};
/**
 *
 * @param firstBinaryTree
 * @param secondBinaryTree
 * @returns
 */
export const isSecondBinaryTreeEmpty: IsSecondBinaryTreeEmpty = <T>(
  firstBinaryTree: BinaryTree<T> | undefined,
  secondBinaryTree: BinaryTree<T> | undefined
) => {
  return !isEmptyTree(firstBinaryTree) && isEmptyTree(secondBinaryTree);
};
/**
 *
 * @param tree
 * @returns
 */
export const isBinaryRootNode: IsBinaryRootNode = <T>(tree: BinaryTree<T>) => {
  return !isUnaryLeft(tree) && !isUnaryRight(tree) && !isSingleton(tree);
};
/**
 * binary tree depth
 * :: a -> b
 * @param node binary Tree node
 * @returns number
 */
export function binaryTreeDepth<T>(node: BinaryTree<T>): number {
  if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return 1 + binaryTreeDepth(node.leftChild as BinaryTree<T>);
  } else if (isUnaryRight(node)) {
    return 1 + binaryTreeDepth(node.rightChild as BinaryTree<T>);
  }
  return (
    1 +
    max(
      binaryTreeDepth(node.leftChild as BinaryTree<T>),
      binaryTreeDepth(node.rightChild as BinaryTree<T>)
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
  binaryNode1: BinaryTree<T> | undefined,
  binaryNode2: BinaryTree<T> | undefined
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
): BinaryTree<T> | undefined {
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
 * binaryTree -> number
 */
export function depth<T>(binaryTree: BinaryTree<T>): number {
  if (
    isEmptyTree(theLeftChild(binaryTree)) &&
    isEmptyTree(theRightChild(binaryTree))
  ) {
    return 1;
  } else if (
    !isEmptyTree(theLeftChild(binaryTree)) &&
    isEmptyTree(theRightChild(binaryTree))
  ) {
    return 1 + depth(theLeftChild(binaryTree));
  } else if (
    !isEmptyTree(theRightChild(binaryTree)) &&
    isEmptyTree(theLeftChild(binaryTree))
  ) {
    return 1 + depth(theRightChild(binaryTree));
  }

  return (
    1 + max(depth(theLeftChild(binaryTree)), depth(theRightChild(binaryTree)))
  );
}

/**
 *
 * @param node
 * @param treeNode
 */
export function embelishLevelFor<T>(
  node: BinaryTree<T>,
  treeNode: BinaryTree<T> | undefined
): { hasNode: boolean; level: number } {
  if (isEmptyTree(treeNode)) {
    return { hasNode: false, level: 0 };
  } else if (isSingleton(treeNode)) {
    return equals(theRoot(node), theRoot(treeNode))
      ? { hasNode: true, level: 1 }
      : { hasNode: false, level: 0 };
  } else if (isUnaryLeft(treeNode)) {
    const { hasNode, level } = embelishLevelFor(node, theLeftChild(treeNode));
    return hasNode || equals(theRoot(node), theRoot(treeNode))
      ? { hasNode: true, level: level + 1 }
      : { hasNode: false, level: level };
  } else if (isUnaryRight(treeNode)) {
    const { hasNode, level } = embelishLevelFor(node, theRightChild(treeNode));
    return hasNode || equals(theRoot(node), theRoot(treeNode))
      ? { hasNode: true, level: level + 1 }
      : { hasNode: false, level: level };
  }
  const { hasNode, level } = embelishLevelFor(node, theLeftChild(treeNode));
  if (hasNode) {
    return { hasNode, level: level + 1 };
  } else {
    const { hasNode, level } = embelishLevelFor(node, theRightChild(treeNode));
    return hasNode || equals(theRoot(node), theRoot(treeNode))
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
export function existLeft<T>(node: BinaryTree<T>): boolean {
  return node.leftChild !== undefined;
}
/**
 * Predicate, check if the binary tree has a right child
 * :: a -> b
 * @param node binary Tree node
 * @returns boolean
 */
export function existRight<T>(node: BinaryTree<T>): boolean {
  return node.rightChild !== undefined;
}
/**
 * check if the binary tree has his two children
 * :: a -> b
 * @param node binary Tree node
 * @returns boolean
 */
export function hasHisTwoChildren<T>(node: BinaryTree<T>): boolean {
  return node.rightChild !== undefined && node.leftChild !== undefined;
}
/**
 * Infixed linearize binary tree
 * :: a -> b
 * @param node binary tree node
 * @returns sequence of elements
 */
export function infixedLinearization<T>(
  node: BinaryTree<T> | undefined
): Array<T> {
  if (isEmptyTree(node)) {
    return [];
  }
  return [
    ...infixedLinearization(theLeftChild(node)),
    theRoot(node) as T,
    ...infixedLinearization(theRightChild(node)),
  ];
}
/**
 * Predicate, check if binary tree is empty
 * :: a -> b
 * @param node binary tree node
 * @returns boolean
 */
export function isEmptyTree<T>(
  node: BinaryTree<T> | null | undefined
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
  binaryNode: BinaryTree<T> | undefined,
  subNode1: BinaryTree<T>,
  subNode2: BinaryTree<T>
): boolean {
  if (isEmptyTree(binaryNode)) {
    return false;
  }

  return (
    equals(subTreeOf(theRoot(subNode1), binaryNode), subNode1) &&
    equals(subTreeOf(theRoot(subNode2), binaryNode), subNode2) &&
    levelFor(subNode1, binaryNode) === levelFor(subNode2, binaryNode)
  );
}
/**
 *
 * @param node
 * @returns
 */
export function isSingleton<T>(node: BinaryTree<T>): boolean {
  return !node.leftChild && !node.rightChild;
}
/**
 *
 * @param node
 * @returns
 */
export function isUnaryLeft<T>(node: BinaryTree<T>): boolean {
  return node.leftChild !== undefined && node.rightChild === undefined;
}
/**
 *
 * @param node
 * @returns
 */
export function isUnaryRight<T>(node: BinaryTree<T>): boolean {
  return node.rightChild !== undefined && node.leftChild === undefined;
}

/**
 * :: BinaryTree, BinaryTree -> boolean
 * @param binaryTree
 * @param binaryTree2
 * @returns
 */
export function isSameStructure<T>(
  binaryTree: BinaryTree<T> | undefined,
  binaryTree2: BinaryTree<T> | undefined
): boolean {
  if (isEmptyTree(binaryTree) && isEmptyTree(binaryTree2)) {
    return true;
  } else if (isEmptyTree(binaryTree) && !isEmptyTree(binaryTree2)) {
    return false;
  } else if (!isEmptyTree(binaryTree) && isEmptyTree(binaryTree2)) {
    return false;
  }
  return (
    isSameStructure(theLeftChild(binaryTree), theLeftChild(binaryTree2)) &&
    isSameStructure(theRightChild(binaryTree), theRightChild(binaryTree2))
  );
}
/**
 * :: a -> a -> BinaryTree -> boolean
 * @param elementE
 * @param elementF
 * @param binaryTree
 */
export function isElementEDescentOfElementF<T>(
  elementE: T,
  elementF: T,
  binaryTree: BinaryTree<T>
): boolean {
  if (isEmptyTree(binaryTree)) {
    return false;
  } else if (isSingleton(binaryTree)) {
    return equals(theRoot(binaryTree), elementF) && equals(elementF, elementE);
  } else if (isUnaryLeft(binaryTree)) {
    return (
      (equals(theRoot(binaryTree), elementF) &&
        isElementPresentInBinaryTree(elementE, theLeftChild(binaryTree))) ||
      isElementPresentInBinaryTree(
        elementE,
        subTreeOf(elementF, theLeftChild(binaryTree))
      )
    );
  } else if (isUnaryRight(binaryTree)) {
    return (
      (equals(theRoot(binaryTree), elementF) &&
        isElementPresentInBinaryTree(elementE, theRightChild(binaryTree))) ||
      isElementPresentInBinaryTree(
        elementE,
        subTreeOf(elementF, theRightChild(binaryTree))
      )
    );
  }
  return (
    (equals(theRoot(binaryTree), elementF) &&
      (isElementPresentInBinaryTree(elementE, theLeftChild(binaryTree)) ||
        isElementPresentInBinaryTree(elementE, theRightChild(binaryTree)))) ||
    isElementPresentInBinaryTree(
      elementE,
      subTreeOf(elementF, theLeftChild(binaryTree))
    ) ||
    isElementPresentInBinaryTree(
      elementE,
      subTreeOf(elementF, theRightChild(binaryTree))
    )
  );
}

/**
 * ::a -> BinaryTree -> boolean
 */
export function isElementPresentInBinaryTree<T>(
  element: T,
  binaryTree: BinaryTree<T> | undefined
): boolean {
  if (isEmptyTree(binaryTree)) {
    return false;
  } else if (isSingleton(binaryTree)) {
    return equals(theRoot(binaryTree), element);
  } else if (isUnaryLeft(binaryTree)) {
    return (
      equals(theRoot(binaryTree), element) ||
      isElementPresentInBinaryTree(element, theLeftChild(binaryTree))
    );
  } else if (isUnaryRight(binaryTree)) {
    return (
      equals(theRoot(binaryTree), element) ||
      isElementPresentInBinaryTree(element, theRightChild(binaryTree))
    );
  }

  return (
    equals(theRoot(binaryTree), element) ||
    isElementPresentInBinaryTree(element, theLeftChild(binaryTree)) ||
    isElementPresentInBinaryTree(element, theRightChild(binaryTree))
  );
}
/**
 *
 * @param node
 * @param treeNode
 * @returns
 */
export function levelFor<T>(
  node: BinaryTree<T>,
  treeNode: BinaryTree<T> | undefined | null
): number {
  const { hasNode, level } = embelishLevelFor(node, treeNode);
  return hasNode ? level : -1;
}

/**
 * a -> b
 * @param node
 * @returns
 */
export function levelLinearization<T>(node: BinaryTree<T>): Array<T> {
  return levelLinearizationByQueue([node]);
}
/**
 *
 * @param nodeArray
 * @returns
 */
export function levelLinearizationByQueue<T>(
  nodeArray: Array<BinaryTree<T>>
): Array<T> {
  if (nodeArray.length === 0) {
    return [];
  } else if (isSingleton(head(nodeArray) as BinaryTree<T>)) {
    return prepend(
      theRoot(head(nodeArray) as BinaryTree<T>) as T,
      levelLinearizationByQueue(tail(nodeArray))
    );
  } else if (isUnaryLeft(head(nodeArray) as BinaryTree<T>)) {
    return prepend(
      theRoot(head(nodeArray) as BinaryTree<T>) as T,
      levelLinearizationByQueue(
        append(
          theLeftChild(head(nodeArray) as BinaryTree<T>) as BinaryTree<T>,
          tail(nodeArray)
        )
      )
    );
  } else if (isUnaryRight(head(nodeArray) as BinaryTree<T>)) {
    return prepend(
      theRoot(head(nodeArray) as BinaryTree<T>) as T,
      levelLinearizationByQueue(
        append(
          theRightChild(head(nodeArray) as BinaryTree<T>) as BinaryTree<T>,
          tail(nodeArray)
        )
      )
    );
  }
  return prepend(
    theRoot(head(nodeArray) as BinaryTree<T>) as T,
    levelLinearizationByQueue(
      append(
        theRightChild(head(nodeArray) as BinaryTree<T>) as BinaryTree<T>,
        append(
          theLeftChild(head(nodeArray) as BinaryTree<T>) as BinaryTree<T>,
          tail(nodeArray)
        )
      )
    )
  );
}
/**
 *
 * @param element
 * @param binaryTree
 */
export function levelAndPresenceOfAnElementInBinaryTree<T>(
  element: T,
  binaryTree: BinaryTree<T>
): LevelPresence {
  if (isSingleton(binaryTree)) {
    return equals(element, theRoot(binaryTree))
      ? { level: 1, present: true }
      : { level: 0, present: false };
  } else if (isUnaryLeft(binaryTree)) {
    if (equals(element, theRoot(binaryTree))) {
      return { level: 1, present: true };
    } else {
      const { level, present } = levelAndPresenceOfAnElementInBinaryTree(
        element,
        theLeftChild(binaryTree)
      );
      return present
        ? { level: level + 1, present: true }
        : { level: level, present: false };
    }
  } else if (isUnaryRight(binaryTree)) {
    if (equals(element, theRoot(binaryTree))) {
      return { level: 1, present: true };
    } else {
      const { level, present } = levelAndPresenceOfAnElementInBinaryTree(
        element,
        theRightChild(binaryTree)
      );
      return present
        ? { level: level + 1, present: true }
        : { level: level, present: false };
    }
  }
  if (equals(element, theRoot(binaryTree))) {
    return {
      level: 1,
      present: true,
    };
  } else {
    const { level, present } = levelAndPresenceOfAnElementInBinaryTree(
      element,
      theLeftChild(binaryTree)
    );
    if (present) {
      return { level: level + 1, present: true };
    } else {
      const { level, present } = levelAndPresenceOfAnElementInBinaryTree(
        element,
        theRightChild(binaryTree)
      );
      return present
        ? { level: level + 1, present: true }
        : { level: level, present: false };
    }
  }
}
/**
 *
 * @param node
 * @returns
 */
export function binaryTreeLeavesMinimumLevel<T>(node: BinaryTree<T>): number {
  if (isSingleton<T>(node)) {
    return 1;
  } else if (isUnaryLeft(node)) {
    return 1 + binaryTreeLeavesMinimumLevel(node.leftChild as BinaryTree<T>);
  } else if (isUnaryRight(node)) {
    return 1 + binaryTreeLeavesMinimumLevel(node.rightChild as BinaryTree<T>);
  }
  return (
    1 +
    min(
      binaryTreeLeavesMinimumLevel(node.leftChild as BinaryTree<T>),
      binaryTreeLeavesMinimumLevel(node.rightChild as BinaryTree<T>)
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
  subTreeOf
);

/**
 *
 * @param node
 * @returns
 */
export function numberOfLeaves<T>(node: BinaryTree<T> | undefined): number {
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
export function numberOfNodes<T>(node: BinaryTree<T> | undefined): number {
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
 * a -> BinaryTree -> Integer
 */
export function numberOfElementsOfGivenValueInBinaryTree<T>(
  element: T,
  binaryTree: BinaryTree<T>
): Integer {
  if (isSingleton(binaryTree)) {
    return equals(element, theRoot(binaryTree)) ? 1 : 0;
  } else if (isUnaryLeft(binaryTree)) {
    return (
      (equals(element, theRoot(binaryTree)) ? 1 : 0) +
      numberOfElementsOfGivenValueInBinaryTree(
        element,
        theLeftChild(binaryTree)
      )
    );
  } else if (isUnaryRight(binaryTree)) {
    return (
      (equals(element, theRoot(binaryTree)) ? 1 : 0) +
      numberOfElementsOfGivenValueInBinaryTree(
        element,
        theRightChild(binaryTree)
      )
    );
  }

  return (
    (equals(element, theRoot(binaryTree)) ? 1 : 0) +
    numberOfElementsOfGivenValueInBinaryTree(
      element,
      theLeftChild(binaryTree)
    ) +
    numberOfElementsOfGivenValueInBinaryTree(element, theRightChild(binaryTree))
  );
}
/**
 *:: a -> [b]
 * @param binaryNode
 * @returns
 */
export function prefixedLinearization<T>(
  binaryNode: BinaryTree<T> | undefined
): Array<T> {
  if (isEmptyTree(binaryNode)) {
    return [];
  }
  return [
    theRoot(binaryNode) as T,
    ...prefixedLinearization(theLeftChild(binaryNode)),
    ...prefixedLinearization(theRightChild(binaryNode)),
  ];
}
/**
 * :: a -> [b]
 * @param binaryNode
 * @returns
 */
export function postfixedLinearization<T>(
  binaryNode: BinaryTree<T> | undefined
): Array<T> {
  if (isEmptyTree(binaryNode)) {
    return [];
  }
  return [
    ...postfixedLinearization(theLeftChild(binaryNode)),
    ...postfixedLinearization(theRightChild(binaryNode)),
    theRoot(binaryNode) as T,
  ];
}

/**
 * :: a -> BinaryTree -> BinaryTree
 * @param element
 * @param binaryTree
 * @returns undefined if element is not in the tree
 */
export function subTreeOf<T>(
  element: T,
  binaryTree: BinaryTree<T>
): BinaryTree<T> | undefined {
  if (isEmptyTree(binaryTree)) {
    return undefined;
  } else if (isSingleton<T>(binaryTree)) {
    return equals(theRoot(binaryTree), element) ? { ...binaryTree } : undefined;
  } else if (isUnaryLeft(binaryTree)) {
    return equals(theRoot(binaryTree), element)
      ? { ...binaryTree }
      : subTreeOf<T>(element, binaryTree.leftChild as BinaryTree<T>);
  } else if (isUnaryRight(binaryTree)) {
    return equals(theRoot(binaryTree), element)
      ? { ...binaryTree }
      : subTreeOf<T>(element, binaryTree.rightChild as BinaryTree<T>);
  }

  if (equals(theRoot(binaryTree), element)) {
    return { ...binaryTree };
  }
  const subTree = subTreeOf(element, binaryTree.leftChild as BinaryTree<T>);
  return isEmptyTree(subTree)
    ? subTreeOf(element, binaryTree.rightChild as BinaryTree<T>)
    : subTree;
}

export const createSymetricalOfBinaryTree: CreateSymetricalOfBinaryTree = <T>(
  tree: BinaryTree<T>
) => {
  if (isSingleton(tree)) {
    return { ...tree };
  } else if (isUnaryLeft(tree)) {
    return theBinaryTree(
      theRoot(tree),
      undefined,
      createSymetricalOfBinaryTree(theLeftChild(tree))
    );
  } else if (isUnaryRight(tree)) {
    return theBinaryTree(
      theRoot(tree),
      createSymetricalOfBinaryTree(theRightChild(tree)),
      undefined
    );
  }

  return theBinaryTree(
    theRoot(tree),
    createSymetricalOfBinaryTree(theRightChild(tree)),
    createSymetricalOfBinaryTree(theLeftChild(tree))
  );
};
