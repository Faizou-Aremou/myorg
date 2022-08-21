import { compose, isEmpty, max, length, head, tail, min } from 'ramda';
import { Forest } from '../interfaces/forest';
import { Tree } from '../interfaces/tree';


/**
 * Forest of sub tree of tree
 * :: a -> b
 * @param tree Tree
 * @returns Forest
 */
export function childrenForest<T>(tree: Tree<T>): Forest<T> {
  return tree.forest;
}
/**
 * Predicate, check if tree doesn't have any trees in his forest 
 * :: a -> b
 * @returns boolean 
 */
export const isSingleton = compose(isEmpty, childrenForest);
/**
 * maximum degree of the children of a tree
 * @param tree Tree
 * @returns number
 */
export function maxDegree<T>(tree: Tree<T>): number {
  return max(
    length(childrenForest(tree)),
    maxForestDegree(childrenForest(tree))
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
 * 
 * @param tree 
 * @returns 
 */
export function depthFor<T>(tree: Tree<T>): number {
  return 0;
}
/**
 * 
 * @param tree 
 * @returns 
 */
export function pathFor<T>(tree: Tree<T>): Tree<T>[] {
  return [];
}
/**
 * root of tree<T>
 * @param tree
 * @returns T
 */
export function root<T>(tree: Tree<T>): T {
  return tree.root;
}
/**
 * 
 * @param tree 
 * @returns 
 */
export function widthFor<T>(tree: Tree<T>): number {
  // need more explanation
  return 0;
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
