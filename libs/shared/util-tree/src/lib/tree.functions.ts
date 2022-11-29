import {
  compose,
  isEmpty,
  max,
  length,
  head,
  tail,
  min,
  equals,
  last,
  init,
  append,
} from 'ramda';
import { Integer } from '@web-times-team/util-number';
import { isSingleton as isSingletonSequence } from '@web-times-team/util-sequence';
import {
  AreAllElementsEquals,
  AreBothForestAsSingletonOfSingletonTree,
  AreBothForestSingleton,
  AreBothTreesSingleton,
  AreFirstForestAsSingletonOfSingletonTreeAndSecondForestAsSingleton,
  AreFirstForestAsSingletonOfSingletonTreeAndSecondForestFirstTreeAsSingleton,
  AreFirstForestFirstTreeAsSingletonAndSecondForestAsSingleton,
  AreFirstForestFirstTreeAsSingletonAndSecondForestAsSingletonOfSingletonTree,
  AreFirstForestFirstTreeAsSingletonAndSecondForestHasLastTreeAsSingleton,
  AreFirstForestSingletonAndSecondForestAsSingletonOfSingletonTree,
  AreFirstForestSingletonAndSecondForestHasFirstTreeAsSingleton,
  AreForestElementsEqualsTo,
  AreTwoForestsSymmetricalToEachOther,
  AreTwoTreesSymmetricalToEachOther,
  CreateSymetricalOfForest,
  CreateSymetricalOfTree,
  Forest,
  IsFirstForestFirstTreeAsSingleton,
  IsFirstForestSingleton,
  IsFirstTreeAsSingleton,
  IsSecondForestAsSingleton,
  IsSecondForestAsSingletonOfSingletonTree,
  NumberOfLeavesOfLevelK,
  NumberOfLeavesOfLevelKInForest,
  Tree,
} from './tree.types';
import { LevelPresence } from '@web-times-team/util-functionnal';

export function theTree<T>(root: T, forest: Forest<T> = []): Tree<T> {
  return {
    root,
    forest,
  } as Tree<T>;
}
/**
 * Forest of sub tree of tree
 * :: a -> b
 * @param tree Tree
 * @returns Forest
 */
export function theChildrenForest<T>(tree: Tree<T>): Forest<T> {
  return tree.forest;
}
/**
 * root of tree<T>
 * @param tree
 * @returns T
 */
export function theRoot<T>(tree: Tree<T>): T {
  return tree.root;
}

export const areAllElementsEquals: AreAllElementsEquals = <T>(
  tree: Tree<T>
) => {
  if (isSingletonTree(tree)) {
    return true;
  }

  return areForestElementsEqualsTo(theRoot(tree), theChildrenForest(tree));
};

export const areForestElementsEqualsTo: AreForestElementsEqualsTo = <T>(
  element: T,
  forest: Forest<T>
) => {
  if (isEmpty(forest)) {
    return true;
  } else if (isSingletonTreeInSingletonForest(forest)) {
    return equals(theRootOfFirstTreeOfForest(forest), element);
  } else if (isSingletonForest) {
    return (
      equals(theRootOfFirstTreeOfForest(forest), element) &&
      areForestElementsEqualsTo(element, theChildrenForest(head(forest)))
    );
  } else if (hasFirstTreeAsSingleton(forest)) {
    return (
      equals(theRootOfFirstTreeOfForest(forest), element) &&
      areForestElementsEqualsTo(element, tail(forest))
    );
  }

  return (
    equals(theRootOfFirstTreeOfForest(forest), element) &&
    areForestElementsEqualsTo(element, theChildrenForest(head(forest))) &&
    areForestElementsEqualsTo(element, tail(forest))
  );
};
/**
 * Predicate, check if tree doesn't have any trees in his forest
 * :: a -> b
 * @returns boolean
 */
export const isSingletonTree = compose(isEmpty, theChildrenForest);
/**
 * maximum degree of the children of a tree
 * @param tree Tree
 * @returns number
 */
export function maxDegree<T>(tree: Tree<T>): number {
  return max(
    length(theChildrenForest(tree)),
    maxForestDegree(theChildrenForest(tree))
  );
}
/**
 * maximum degree of the trees in a forest
 * :: a -> b
 * @param forest
 * @returns
 */
export function maxForestDegree<T>(forest: Forest<T>): number {
  if (isEmpty(forest)) {
    return -1;
  }
  return max(maxDegree(head(forest) as Tree<T>), maxForestDegree(tail(forest)));
}
/**
 * :: Tree -> integer
 */
export function depthTree<T>(tree: Tree<T>): number {
  return depthForest([tree]);
}

/**
 * :: Forest -> integer
 */
export function depthForest<T>(forest: Forest<T>): number {
  if (isSingletonTreeInSingletonForest(forest) || isEmpty(forest)) {
    return 1;
  } else if (isSingletonForest(forest)) {
    return 1 + depthForest(theForestOfFirstTreeOfForest(forest));
  } else if (hasFirstTreeAsSingleton(forest)) {
    return max(1, depthForest(tail(forest)));
  }
  return max(
    1 + depthForest(theChildrenForest(head(forest))),
    depthForest(tail(forest))
  );
}
/**
 * :: forest -> boolean
 */
export function hasFirstTreeAsSingleton<T>(forest: Forest<T>): boolean {
  return (
    !isSingletonSequence(forest) && isSingletonTree(head(forest) as Tree<T>)
  );
}
/**
 * :: a -> a -> Tree
 * @param elementE
 * @param elementF
 * @param tree
 */
export function isElementEDescentOfElementFInTree<T>(
  elementE: T,
  elementF: T,
  tree: Tree<T>
): boolean {
  if (isSingletonTree(tree)) {
    return equals(theRoot(tree), elementF) && equals(elementF, elementE);
  }
  return (
    (equals(theRoot(tree), elementF) &&
      isTheElementPresentInTheTree(elementE, tree)) ||
    isTheElementPresentInTheForest(elementE, subForestInTree(elementF, tree))
  );
}
/**
 *:: element -> Tree -> booleen
 * @param element
 * @param tree
 * @returns
 */
export function isTheElementPresentInTheTree<T>(
  element: T,
  tree: Tree<T>
): boolean {
  if (isSingletonTree(tree)) {
    return equals(theRoot(tree), element);
  }
  return (
    equals(theRoot(tree), element) ||
    isTheElementPresentInTheForest(element, theChildrenForest(tree))
  );
}
/**
 * :: a -> forest -> booleen
 * @param element
 * @param forest
 * @returns
 */
export function isTheElementPresentInTheForest<T>(
  element: T,
  forest: Forest<T>
): boolean {
  if (isEmpty(forest)) {
    return false;
  } else if (isSingletonTreeInSingletonForest(forest)) {
    return equals(theRootOfFirstTreeOfForest(forest), element);
  } else if (isSingletonForest(forest)) {
    return (
      equals(theRootOfFirstTreeOfForest(forest), element) ||
      isTheElementPresentInTheForest(
        element,
        theForestOfFirstTreeOfForest(forest)
      )
    );
  } else if (hasFirstTreeAsSingleton(forest)) {
    return (
      equals(theRootOfFirstTreeOfForest(forest), element) ||
      isTheElementPresentInTheForest(element, tail(forest))
    );
  }
  return (
    equals(theRootOfFirstTreeOfForest(forest), element) ||
    isTheElementPresentInTheForest(
      element,
      theForestOfFirstTreeOfForest(forest)
    ) ||
    isTheElementPresentInTheForest(element, tail(forest))
  );
}

/**
 * :: forest -> boolean
 */
export function isSingletonTreeInSingletonForest<T>(
  forest: Forest<T>
): boolean {
  return (
    isSingletonSequence(forest) && isSingletonTree(head(forest) as Tree<T>)
  );
}
/**
 * ::Forest -> boolean
 */
export function isSingletonForest<T>(forest: Forest<T>): boolean {
  return (
    isSingletonSequence(forest) && !isSingletonTree(head(forest) as Tree<T>)
  );
}
/**
 *::a -> Tree -> Integer
 */
export function numberOfElementsOfGivenValueInTree<T>(
  element: T,
  tree: Tree<T>
): Integer {
  if (isSingletonTree(tree)) {
    return equals(element, theRoot(tree)) ? 1 : 0;
  }

  return (
    (equals(element, theRoot(tree)) ? 1 : 0) +
    numberOfElementsOfGivenValueInForest(element, theChildrenForest(tree))
  );
}
/**
 * ::a -> forest -> Integer
 */
export function numberOfElementsOfGivenValueInForest<T>(
  element: T,
  forest: Forest<T>
): Integer {
  if (isEmpty(forest)) {
    return 0;
  } else if (isSingletonTreeInSingletonForest(forest)) {
    return equals(element, theRootOfFirstTreeOfForest(forest)) ? 1 : 0;
  } else if (isSingletonForest(forest)) {
    return (
      (equals(element, theRootOfFirstTreeOfForest(forest)) ? 1 : 0) +
      numberOfElementsOfGivenValueInForest(
        element,
        theForestOfFirstTreeOfForest(forest)
      )
    );
  } else if (hasFirstTreeAsSingleton(forest)) {
    return (
      (equals(element, theRootOfFirstTreeOfForest(forest)) ? 1 : 0) +
      numberOfElementsOfGivenValueInForest(element, tail(forest))
    );
  }
  return (
    (equals(element, theRootOfFirstTreeOfForest(forest)) ? 1 : 0) +
    numberOfElementsOfGivenValueInForest(
      element,
      theForestOfFirstTreeOfForest(forest)
    ) +
    numberOfElementsOfGivenValueInForest(element, tail(forest))
  );
}

/**
 * Tree leaves minimum level
 * :: a -> b
 * @param tree
 * @returns number
 */
export function treeLeavesMinimumLevel<T>(tree: Tree<T>): number {
  return forestLeavesMinimumLevel([tree]);
}
/**
 * Forest leaves minimum level
 * @param forest
 * @returns
 */
export function forestLeavesMinimumLevel<T>(forest: Forest<T>): number {
  if (
    isSingletonTreeInSingletonForest(forest) ||
    hasFirstTreeAsSingleton(forest) ||
    isEmpty(forest)
  ) {
    return 1;
  } else if (isSingletonForest(forest)) {
    return 1 + forestLeavesMinimumLevel(theForestOfFirstTreeOfForest(forest));
  }
  return min(
    1 + forestLeavesMinimumLevel(theForestOfFirstTreeOfForest(forest)),
    forestLeavesMinimumLevel(tail(forest))
  );
}
/**
 * ::a -> Forest -> LevelPresence
 */
export function levelAndPresenceOfElementInForest<T>(
  element: T,
  forest: Forest<T>
): LevelPresence {
  if (isEmpty(forest)) {
    return { level: 0, present: false };
  } else if (isSingletonTreeInSingletonForest(forest)) {
    return equals(element, theRootOfFirstTreeOfForest(forest))
      ? { level: 1, present: true }
      : { level: 0, present: false };
  } else if (isSingletonForest(forest)) {
    if (equals(element, theRootOfFirstTreeOfForest(forest))) {
      return {
        level: 1,
        present: true,
      };
    } else {
      const { level, present } = levelAndPresenceOfElementInForest(
        element,
        theForestOfFirstTreeOfForest(forest)
      );
      return present
        ? { level: level + 1, present: true }
        : { level: level, present: false };
    }
  } else if (hasFirstTreeAsSingleton(forest)) {
    if (equals(element, compose(theRoot, head)(forest))) {
      return {
        level: 1,
        present: true,
      };
    } else {
      const { level, present } = levelAndPresenceOfElementInForest(
        element,
        tail(forest)
      );
      return present
        ? { level: level + 1, present: true }
        : { level: level, present: false };
    }
  }
  if (equals(element, compose(theRoot, head)(forest))) {
    return {
      level: 1,
      present: true,
    };
  }
  const { level, present } = levelAndPresenceOfElementInForest(
    element,
    compose(theChildrenForest, head)(forest)
  );
  if (present) {
    return { level: level + 1, present: true };
  } else {
    const { level, present } = levelAndPresenceOfElementInForest(
      element,
      tail(forest)
    );
    return present
      ? { level: level + 1, present: true }
      : { level: level, present: false };
  }
}

/**
 * :: a -> Tree -> Integer
 */
export function levelOfElementInTree<T>(element: T, tree: Tree<T>): Integer {
  const { level, present } = levelAndPresenceOfElementInTree(element, tree);
  return present ? level : -1;
}
/**
 * ::a -> Tree -> LevelPresence
 */
export function levelAndPresenceOfElementInTree<T>(
  element: T,
  tree: Tree<T>
): LevelPresence {
  if (isSingletonTree(tree)) {
    return equals(element, theRoot(tree))
      ? { level: 1, present: true }
      : { level: 0, present: false };
  }
  if (equals(element, theRoot(tree))) {
    return { level: 1, present: true };
  } else {
    const { level, present } = levelAndPresenceOfElementInForest(
      element,
      theChildrenForest(tree)
    );
    return present
      ? { level: level + 1, present: true }
      : { level: level, present: false };
  }
}
/**
 * :: a -> Tree
 * @param element
 * @param tree
 * @returns
 */
export function subForestInTree<T>(element: T, tree: Tree<T>): Forest<T> {
  if (isSingletonTree(tree)) {
    return equals(element, theRoot(tree)) ? [tree] : [];
  }
  return equals(element, theRoot(tree))
    ? [tree]
    : subForestInForest(element, theChildrenForest(tree));
}

/**
 * :: a -> Forest
 * @param element
 * @param forest
 */
export function subForestInForest<T>(element: T, forest: Forest<T>): Forest<T> {
  if (isEmpty(forest)) {
    return [];
  } else if (isSingletonTreeInSingletonForest(forest)) {
    return equals(theRootOfFirstTreeOfForest(forest), element) ? forest : [];
  } else if (isSingletonForest(forest)) {
    return equals(theRootOfFirstTreeOfForest(forest), element)
      ? forest
      : subForestInForest(element, theForestOfFirstTreeOfForest(forest));
  } else if (hasFirstTreeAsSingleton(forest)) {
    if (equals(theRootOfFirstTreeOfForest(forest), element)) {
      return [head(forest) as Tree<T>];
    } else {
      return subForestInForest(element, tail(forest));
    }
  } else if (equals(theRootOfFirstTreeOfForest(forest), element)) {
    return forest;
  }

  const subForest = subForestInForest(
    element,
    theForestOfFirstTreeOfForest(forest)
  );

  return isEmpty(subForest)
    ? subForestInForest(element, tail(forest))
    : subForest;
}

export function theRootOfFirstTreeOfForest<T>(forest: Forest<T>): T {
  return theRoot(head(forest) as Tree<T>);
}
export function theForestOfFirstTreeOfForest<T>(forest: Forest<T>): Forest<T> {
  return theChildrenForest(head(forest) as Tree<T>);
}

/**
 *
 * @param leftTree
 * @param rightTree
 * @returns true or false
 */
export const areTwoTreesSymmetricalToEachOther: AreTwoTreesSymmetricalToEachOther =
  <T>(leftTree: Tree<T>, rightTree: Tree<T>) => {
    if (areBothTreesSingleton(leftTree, rightTree)) {
      return equals(theRoot(leftTree), theRoot(rightTree));
    } else if (isFirstTreeAsSingleton(leftTree, rightTree)) {
      return false;
    } else if (isSecondTreeAsSingleton(leftTree, rightTree)) {
      return false;
    }

    return (
      equals(theRoot(leftTree), theRoot(rightTree)) &&
      areTwoForestsSymmetricalToEachOther(
        theChildrenForest(leftTree),
        theChildrenForest(rightTree)
      )
    );
  };

export const areBothTreesSingleton: AreBothTreesSingleton = <T>(
  firstTree: Tree<T>,
  secondTree: Tree<T>
) => {
  return isSingletonTree(firstTree) && isSingletonTree(secondTree);
};
// TODO: have to handles forest empty case
export const areTwoForestsSymmetricalToEachOther: AreTwoForestsSymmetricalToEachOther =
  <T>(leftForest: Forest<T>, rightForest: Forest<T>) => {
    if (areBothForestAsSingletonOfSingletonTree(leftForest, rightForest)) {
      return equals(theRoot(head(leftForest)), theRoot(head(rightForest)));
    } else if (
      areFirstForestAsSingletonOfSingletonTreeAndSecondForestAsSingleton(
        leftForest,
        rightForest
      )
    ) {
      return false;
    } else if (
      areFirstForestAsSingletonOfSingletonTreeAndSecondForestFirstTreeAsSingleton(
        leftForest,
        rightForest
      )
    ) {
      return false;
    } else if (
      isFirstForestAsSingletonOfSingletonTree(leftForest, rightForest)
    ) {
      return false;
    } else if (
      areFirstForestSingletonAndSecondForestAsSingletonOfSingletonTree(
        leftForest,
        rightForest
      )
    ) {
      return false;
    } else if (areBothForestSingleton(leftForest, rightForest)) {
      return (
        equals(theRoot(head(leftForest)), theRoot(head(rightForest))) &&
        areTwoForestsSymmetricalToEachOther(
          theChildrenForest(head(leftForest)),
          theChildrenForest(head(rightForest))
        )
      );
    } else if (
      areFirstForestSingletonAndSecondForestHasFirstTreeAsSingleton(
        leftForest,
        rightForest
      )
    ) {
      return false;
    } else if (isFirstForestSingleton(leftForest, rightForest)) {
      return false;
    } else if (
      areFirstForestFirstTreeAsSingletonAndSecondForestAsSingletonOfSingletonTree(
        leftForest,
        rightForest
      )
    ) {
      return false;
    } else if (
      areFirstForestFirstTreeAsSingletonAndSecondForestAsSingleton(
        leftForest,
        rightForest
      )
    ) {
      return false;
    } else if (
      areFirstForestFirstTreeAsSingletonAndSecondForestHasLastTreeAsSingleton(
        leftForest,
        rightForest
      )
    ) {
      return (
        equals(theRoot(head(leftForest)), theRoot(last(rightForest))) &&
        areTwoForestsSymmetricalToEachOther(tail(leftForest), init(rightForest))
      );
    } else if (isFirstForestFirstTreeAsSingleton(leftForest, rightForest)) {
      return false;
    } else if (
      isSecondForestAsSingletonOfSingletonTree(leftForest, rightForest)
    ) {
      return false;
    } else if (isSecondForestAsSingleton(leftForest, rightForest)) {
      return false;
    } else if (isSecondForestHasLastTreeAsSingleton(leftForest, rightForest)) {
      return false;
    }

    return (
      equals(theRoot(head(leftForest)), theRoot(last(rightForest))) &&
      areTwoForestsSymmetricalToEachOther(tail(leftForest), init(rightForest))
    );
  };

export const isFirstTreeAsSingleton: IsFirstTreeAsSingleton = <T>(
  firstTree: Tree<T>,
  secondTree: Tree<T>
) => {
  return isSingletonTree(firstTree) && !isSingletonTree(secondTree);
};

export const isSecondTreeAsSingleton: IsFirstTreeAsSingleton = <T>(
  firstTree: Tree<T>,
  secondTree: Tree<T>
) => {
  return !isSingletonTree(firstTree) && isSingletonTree(secondTree);
};

export const areBothForestAsSingletonOfSingletonTree: AreBothForestAsSingletonOfSingletonTree =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      isSingletonTreeInSingletonForest(firstForest) &&
      isSingletonTreeInSingletonForest(secondForest)
    );
  };
export const areFirstForestAsSingletonOfSingletonTreeAndSecondForestAsSingleton: AreFirstForestAsSingletonOfSingletonTreeAndSecondForestAsSingleton =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      isSingletonTreeInSingletonForest(firstForest) &&
      isSingletonForest(secondForest)
    );
  };
export const areFirstForestAsSingletonOfSingletonTreeAndSecondForestFirstTreeAsSingleton: AreFirstForestAsSingletonOfSingletonTreeAndSecondForestFirstTreeAsSingleton =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      isSingletonTreeInSingletonForest(firstForest) &&
      hasFirstTreeAsSingleton(secondForest)
    );
  };
export const isFirstForestAsSingletonOfSingletonTree: AreBothForestAsSingletonOfSingletonTree =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      isSingletonTreeInSingletonForest(firstForest) &&
      !isSingletonForest(secondForest) &&
      !hasFirstTreeAsSingleton(secondForest)
    );
  };
export const areFirstForestSingletonAndSecondForestAsSingletonOfSingletonTree: AreFirstForestSingletonAndSecondForestAsSingletonOfSingletonTree =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      isSingletonForest(firstForest) &&
      isSingletonTreeInSingletonForest(secondForest)
    );
  };

export const areBothForestSingleton: AreBothForestSingleton = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => {
  return isSingletonForest(firstForest) && isSingletonForest(secondForest);
};

export const areFirstForestSingletonAndSecondForestHasFirstTreeAsSingleton: AreFirstForestSingletonAndSecondForestHasFirstTreeAsSingleton =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      isSingletonForest(firstForest) && hasFirstTreeAsSingleton(secondForest)
    );
  };
export const isFirstForestSingleton: IsFirstForestSingleton = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => {
  return (
    isSingletonForest(firstForest) &&
    !isSingletonForest(secondForest) &&
    !hasFirstTreeAsSingleton(secondForest)
  );
};

export const areFirstForestFirstTreeAsSingletonAndSecondForestAsSingletonOfSingletonTree: AreFirstForestFirstTreeAsSingletonAndSecondForestAsSingletonOfSingletonTree =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      hasFirstTreeAsSingleton(firstForest) &&
      isSingletonTreeInSingletonForest(secondForest)
    );
  };

export const areFirstForestFirstTreeAsSingletonAndSecondForestAsSingleton: AreFirstForestFirstTreeAsSingletonAndSecondForestAsSingleton =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      hasFirstTreeAsSingleton(firstForest) && isSingletonForest(secondForest)
    );
  };
export const areFirstForestFirstTreeAsSingletonAndSecondForestHasLastTreeAsSingleton: AreFirstForestFirstTreeAsSingletonAndSecondForestHasLastTreeAsSingleton =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      hasFirstTreeAsSingleton(firstForest) &&
      isSingletonTree(last(secondForest))
    );
  };
export const isFirstForestFirstTreeAsSingleton: IsFirstForestFirstTreeAsSingleton =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      hasFirstTreeAsSingleton(firstForest) &&
      !isSingletonForest(secondForest) &&
      !hasFirstTreeAsSingleton(secondForest) &&
      !isSingletonTree(last(secondForest))
    );
  };
export const isSecondForestAsSingletonOfSingletonTree: IsSecondForestAsSingletonOfSingletonTree =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      !isSingletonForest(firstForest) &&
      !hasFirstTreeAsSingleton(firstForest) &&
      isSingletonTreeInSingletonForest(secondForest)
    );
  };
export const isSecondForestAsSingleton: IsSecondForestAsSingleton = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => {
  return (
    !isSingletonForest(firstForest) &&
    !hasFirstTreeAsSingleton(firstForest) &&
    isSingletonForest(secondForest)
  );
};
export const isSecondForestHasLastTreeAsSingleton: AreBothForestAsSingletonOfSingletonTree =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => {
    return (
      !isSingletonForest(firstForest) &&
      !hasFirstTreeAsSingleton(firstForest) &&
      isSingletonTree(last(secondForest))
    );
  };

export const createSymetricalOfTree: CreateSymetricalOfTree = <T>(
  tree: Tree<T>
) => {
  if (isSingletonTree(tree)) {
    return theTree(theRoot(tree));
  }

  return theTree(
    theRoot(tree),
    createSymetricalOfForest(theChildrenForest(tree))
  );
};
export const createSymetricalOfForest: CreateSymetricalOfForest = <T>(
  forest: Forest<T>
) => {
  if (isSingletonTreeInSingletonForest(forest)) {
    return [...forest];
  } else if (isSingletonForest(forest)) {
    return [
      theTree(
        theRoot(head(forest)),
        createSymetricalOfForest(theChildrenForest(head(forest)))
      ),
    ];
  } else if (hasFirstTreeAsSingleton(forest)) {
    return append(
      theTree(theRoot(head(forest))),
      createSymetricalOfForest(tail(forest))
    );
  }
  return append(
    theTree(
      theRoot(head(forest)),
      createSymetricalOfForest(theChildrenForest(head(forest)))
    ),
    createSymetricalOfForest(tail(forest))
  );
};

/**
 *
 * @param levelK
 * @param tree
 * @returns
 */
export const numberOfLeavesOfLevelK: NumberOfLeavesOfLevelK = <T>(
  levelK: Integer,
  tree: Tree<T>
) => {
  if (isSingletonTree(tree)) {
    return equals(levelK, 1) ? 1 : 0;
  }
  return numberOfLeavesOfLevelKInForest(levelK - 1, theChildrenForest(tree));
};

export const numberOfLeavesOfLevelKInForest: NumberOfLeavesOfLevelKInForest = <
  T
>(
  levelK: Integer,
  forest: Forest<T>
) => {
  if (isEmpty(forest)) {
    return equals(levelK, 0) ? 1 : 0;
  }
  if (isSingletonTreeInSingletonForest(forest)) {
    return equals(levelK, 1) ? 1 : 0;
  } else if (isSingletonForest(forest)) {
    return numberOfLeavesOfLevelKInForest(
      levelK - 1,
      theForestOfFirstTreeOfForest(forest)
    );
  } else if (hasFirstTreeAsSingleton(forest)) {
    return (
      (equals(levelK, 1) ? 1 : 0) +
      numberOfLeavesOfLevelKInForest(levelK, tail(forest))
    );
  }
  return (
    numberOfLeavesOfLevelKInForest(
      levelK - 1,
      theForestOfFirstTreeOfForest(forest)
    ) + numberOfLeavesOfLevelKInForest(levelK, tail(forest))
  );
};
