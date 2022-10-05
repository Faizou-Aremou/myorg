import { compose, isEmpty, max, length, head, tail, min, equals } from 'ramda';
import { LevelPresence } from './level-presence';
import { isSingleton as isSingletonSequence, Sequence } from './sequence';

export type Tree<T> = {
  readonly root: T;
  readonly forest: Forest<T>;
};

export type Forest<T> = Sequence<Tree<T>>;
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
/**
 * Predicate, check if tree doesn't have any trees in his forest
 * :: a -> b
 * @returns boolean
 */
export const isSingleton = compose(isEmpty, theChildrenForest);
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
  if (isSingletonSequence(forest) && isSingleton(head(forest) as Tree<T>)) {
    return 1;
  } else if (
    isSingletonSequence(forest) &&
    !isSingleton(head(forest) as Tree<T>)
  ) {
    return (1+depthForest(theChildrenForest(head(forest) as Tree<T>)));
  } else if (
    !isSingletonSequence(forest) &&
    isSingleton(head(forest) as Tree<T>)
  ) {
    return max(1, depthForest(tail(forest)));
  }
  return max(
    1 + depthForest(theChildrenForest(head(forest))),
    depthForest(tail(forest))
  );
}
// /**
//  *
//  * @param tree
//  * @returns
//  */
// export function pathFor<T>(tree: Tree<T>): Tree<T>[] {
//   return [];
// }

// /**
//  *
//  * @param tree
//  * @returns
//  */
// export function widthFor<T>(tree: Tree<T>): number {
//   // need more explanation
//   return 0;
// }

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
  if (isSingleton(head(forest) as Tree<T>)) {
    return 1;
  } else if (length(forest) === 1 && !isSingleton(head(forest) as Tree<T>)) {
    return (
      1 + forestLeavesMinimumLevel(theChildrenForest(head(forest) as Tree<T>))
    );
  }

  return min(
    1 + forestLeavesMinimumLevel(theChildrenForest(head(forest) as Tree<T>)),
    forestLeavesMinimumLevel(tail(forest))
  );
}
/**
 *
 * @param element
 * @param forest
 */
export function levelAndPresenceOfElementInForest<T>(
  element: T,
  forest: Forest<T>
): LevelPresence {
  if (isSingletonSequence(forest) && compose(isSingleton, head)(forest)) {
    return equals(element, compose(theRoot, head)(forest))
      ? { level: 1, present: true }
      : { level: 0, present: false };
  } else if (isSingletonSequence(forest) && !isSingleton(head(forest))) {
    if (equals(element, compose(theRoot, head)(forest))) {
      return {
        level: 1,
        present: true,
      };
    } else {
      const { level, present } = levelAndPresenceOfElementInForest(
        element,
        compose(theChildrenForest, head)(forest)
      );
      return present
        ? { level: level + 1, present: true }
        : { level: level, present: false };
    }
  } else if (
    !isSingletonSequence(forest) &&
    compose(isSingleton, head)(forest)
  ) {
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
  } else {
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
}

export function levelOfElementInTree<T>(element: T, tree: Tree<T>): number {
  const { level, present } = levelAndPresenceOfElementInTree(element, tree);
  return present ? level : -1;
}

export function levelAndPresenceOfElementInTree<T>(
  element: T,
  tree: Tree<T>
): LevelPresence {
  if (isSingleton(tree)) {
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
