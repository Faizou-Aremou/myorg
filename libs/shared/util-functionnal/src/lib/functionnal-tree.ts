import { compose, isEmpty, max, length, head, tail, min } from 'ramda';
import { Forest } from '../interfaces/forest';
import { Tree } from '../interfaces/tree';

export function testModule(): string {
  return 'it works';
}
/**
 *
 * @param tree
 * @returns
 */
export function childrenForest<T>(tree: Tree<T>): Forest<T> {
  return tree.forest;
}
/**
 *
 */
export const isSingleton = compose(isEmpty, childrenForest);
/**
 *
 * @param tree
 */
export function maxDegree<T>(tree: Tree<T>): number {
  return max(
    length(childrenForest(tree)),
    maxForestDegree(childrenForest(tree))
  );
}
export function maxForestDegree<T>(forest: Forest<T>): number {
  if (isEmpty(forest)) {
    return -1;
  }
  return max(maxDegree(head(forest) as Tree<T>), maxForestDegree(tail(forest)));
}

export function depthFor<T>(tree: Tree<T>): number {
  return 0;
}
export function pathFor<T>(tree: Tree<T>): Tree<T>[] {
  return [];
}
/**
 *
 * @param tree
 * @returns
 */
export function root<T>(tree: Tree<T>): T {
  return tree.root;
}

export function widthFor<T>(tree: Tree<T>): number {
  // need more explanation
  return 0;
}

export function treeLeavesMinimumLevel<T>(tree: Tree<T>): number {
  return forestLeavesMinimumLevel([tree]);
}

export function forestLeavesMinimumLevel<T>(forest: Forest<T>): number {
  if (isSingleton(head(forest) as Tree<T>)) {
    return 1;
  } else if (length(forest) === 1 && !isSingleton(head(forest) as Tree<T>)) {
    return (
      1 + forestLeavesMinimumLevel(childrenForest(head(forest) as Tree<T>))
    );
  }

  return min(
    1 + forestLeavesMinimumLevel(childrenForest(head(forest) as Tree<T>)),
    forestLeavesMinimumLevel(tail(forest))
  );
}
