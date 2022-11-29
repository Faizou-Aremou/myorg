import { Integer } from '@web-times-team/util-number';
import { Sequence } from '@web-times-team/util-sequence';

export type Tree<T> = {
  readonly root: T;
  readonly forest: Forest<T>;
};

export type Forest<T> = Sequence<Tree<T>>;

export type AreTwoTreesSymmetricalToEachOther = <T>(
  leftTree: Tree<T>,
  rightTree: Tree<T>
) => boolean;

export type AreTwoForestsSymmetricalToEachOther = <T>(
  leftForest: Forest<T>,
  rightForest: Forest<T>
) => boolean;

export type AreBothTreesSingleton = <T>(
  firstTree: Tree<T>,
  secondTree: Tree<T>
) => boolean;

export type IsFirstTreeAsSingleton = <T>(
  firstTree: Tree<T>,
  secondTree: Tree<T>
) => boolean;
export type IsSecondTreeAsSingleton = <T>(
  firstTree: Tree<T>,
  secondTree: Tree<T>
) => boolean;

export type AreBothForestAsSingletonOfSingletonTree = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;
export type AreFirstForestAsSingletonOfSingletonTreeAndSecondForestAsSingleton =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => boolean;
export type AreFirstForestAsSingletonOfSingletonTreeAndSecondForestFirstTreeAsSingleton =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => boolean;
export type IsFirstForestAsSingletonOfSingletonTree = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;

export type AreFirstForestSingletonAndSecondForestAsSingletonOfSingletonTree = <
  T
>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;
export type AreBothForestSingleton = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;
export type AreFirstForestSingletonAndSecondForestHasFirstTreeAsSingleton = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;
export type IsFirstForestSingleton = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;

export type AreFirstForestFirstTreeAsSingletonAndSecondForestAsSingletonOfSingletonTree =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => boolean;
export type AreFirstForestFirstTreeAsSingletonAndSecondForestAsSingleton = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;
export type AreFirstForestFirstTreeAsSingletonAndSecondForestHasLastTreeAsSingleton =
  <T>(firstForest: Forest<T>, secondForest: Forest<T>) => boolean;
export type IsFirstForestFirstTreeAsSingleton = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;

export type IsSecondForestAsSingletonOfSingletonTree = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;
export type IsSecondForestAsSingleton = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;
export type IsSecondForestHasLastTreeAsSingleton = <T>(
  firstForest: Forest<T>,
  secondForest: Forest<T>
) => boolean;

export type CreateSymetricalOfTree = <T>(tree: Tree<T>) => Tree<T>;
export type CreateSymetricalOfForest = <T>(tree: Forest<T>) => Forest<T>;

export type AreAllElementsEquals = <T>(tree: Tree<T>) => boolean;
export type AreForestElementsEqualsTo = <T>(
  element: T,
  forest: Forest<T>
) => boolean;

export type NumberOfLeavesOfLevelK = <T>(
  levelK: Integer,
  tree: Tree<T>
) => Integer;
export type NumberOfLeavesOfLevelKInForest = <T>(
  levelK: Integer,
  forest: Forest<T>
) => Integer;
