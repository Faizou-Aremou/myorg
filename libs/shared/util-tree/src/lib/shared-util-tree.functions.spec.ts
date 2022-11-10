import {
  theChildrenForest,
  forestLeavesMinimumLevel,
  isSingletonTree,
  maxDegree,
  maxForestDegree,
  theTreeRoot,
  treeLeavesMinimumLevel,
  depthTree,
  numberOfElementsOfGivenValueInTree,
  isTheElementPresentInTheTree,
  isElementEDescentOfElementFInTree,
} from './shared-util-tree.functions';
import { Tree } from './shared-util-tree.types';
import {performance} from 'perf_hooks';

const numberTree: Tree<number> = {
  root: 1,
  forest: [
    {
      root: 2,
      forest: [
        { root: 12, forest: [] },
        { root: 13, forest: [] },
        { root: 14, forest: [] },
        { root: 15, forest: [] },
        { root: 16, forest: [] },
        { root: 17, forest: [] },
        { root: 18, forest: [] },
        { root: 19, forest: [] },
        { root: 20, forest: [] },
        { root: 21, forest: [] },
      ],
    },
    { root: 3, forest: [] },
    { root: 4, forest: [] },
    { root: 5, forest: [] },
    { root: 6, forest: [] },
    { root: 7, forest: [] },
    { root: 8, forest: [] },
    { root: 9, forest: [] },
    { root: 10, forest: [] },
    { root: 11, forest: [] },
  ],
};

describe('functionnal tree ', () => {
  it('childrenForest', () => {
    const t0 = performance.now();
    theChildrenForest(numberTree);
    const t1 = performance.now();
    console.log('childrenForest ' + (t1 - t0), 'milliseconds');
    expect(theChildrenForest(numberTree)).toEqual([
      {
        root: 2,
        forest: [
          { root: 12, forest: [] },
          { root: 13, forest: [] },
          { root: 14, forest: [] },
          { root: 15, forest: [] },
          { root: 16, forest: [] },
          { root: 17, forest: [] },
          { root: 18, forest: [] },
          { root: 19, forest: [] },
          { root: 20, forest: [] },
          { root: 21, forest: [] },
        ],
      },
      { root: 3, forest: [] },
      { root: 4, forest: [] },
      { root: 5, forest: [] },
      { root: 6, forest: [] },
      { root: 7, forest: [] },
      { root: 8, forest: [] },
      { root: 9, forest: [] },
      { root: 10, forest: [] },
      { root: 11, forest: [] },
    ]);
  });
  it('depthTree', () => {
    const t0 = performance.now();
    depthTree(numberTree);
    const t1 = performance.now();
    console.log('depthTree ' + (t1 - t0), 'milliseconds');
    expect(depthTree(numberTree)).toBe(3);
  });
  it('isSingleton', () => {
    const t0 = performance.now();
    isSingletonTree(numberTree);
    const t1 = performance.now();
    console.log('isSingleton ' + (t1 - t0), 'milliseconds');
    expect(
      isSingletonTree({
        root: 1,
        forest: [],
      })
    ).toBe(true);
    expect(isSingletonTree(numberTree)).toBe(false);
  });
  it('isElementEDescentOfElementFInTree', () => {
    const t0 = performance.now();
    isElementEDescentOfElementFInTree(12, 2, numberTree);
    const t1 = performance.now();
    console.log(
      'isElementEDescentOfElementFInTree ' + (t1 - t0),
      'milliseconds'
    );
    expect(isElementEDescentOfElementFInTree(12, 2, numberTree)).toBe(true);
    expect(isElementEDescentOfElementFInTree(2, 12, numberTree)).toBe(false);
  });
  it('isTheElementPresentInTheTree', () => {
    const t0 = performance.now();
    isTheElementPresentInTheTree(12, numberTree);
    const t1 = performance.now();
    console.log('isTheElementPresentInTheTree ' + (t1 - t0), 'milliseconds');
    expect(isTheElementPresentInTheTree(12, numberTree)).toBe(true);
    expect(isTheElementPresentInTheTree(25, numberTree)).toBe(false);
  });
  it('maxDegree', () => {
    const t0 = performance.now();
    maxDegree(numberTree);
    const t1 = performance.now();
    console.log('maxDegree ' + (t1 - t0), 'milliseconds');
    expect(maxDegree(numberTree)).toBe(10);
  });
  it('maxForestDegree', () => {
    const t0 = performance.now();
    maxForestDegree(theChildrenForest(numberTree));
    const t1 = performance.now();
    console.log('maxForestDegree ' + (t1 - t0), 'milliseconds');
    expect(maxForestDegree(theChildrenForest(numberTree))).toBe(10);
  });
  it('numberOfElementsOfGivenValueInTree', () => {
    const t0 = performance.now();
    numberOfElementsOfGivenValueInTree(5, numberTree);
    const t1 = performance.now();
    console.log(
      'numberOfElementsOfGivenValueInTree ' + (t1 - t0),
      'milliseconds'
    );
    expect(
      numberOfElementsOfGivenValueInTree(12, {
        root: 1,
        forest: [
          {
            root: 2,
            forest: [
              { root: 12, forest: [] },
              { root: 13, forest: [] },
              { root: 14, forest: [] },
              { root: 15, forest: [] },
              { root: 16, forest: [] },
              { root: 17, forest: [] },
              { root: 18, forest: [] },
              { root: 19, forest: [] },
              { root: 12, forest: [] },
              { root: 21, forest: [] },
            ],
          },
          { root: 3, forest: [] },
          { root: 4, forest: [] },
          { root: 12, forest: [] },
          { root: 6, forest: [] },
          { root: 7, forest: [] },
          { root: 8, forest: [] },
          { root: 9, forest: [] },
          { root: 10, forest: [] },
          { root: 11, forest: [] },
        ],
      })
    ).toBe(3);
  });
  it('root', () => {
    const t0 = performance.now();
    theTreeRoot(numberTree);
    const t1 = performance.now();
    console.log('root ' + (t1 - t0), 'milliseconds');
    expect(theTreeRoot(numberTree)).toBe(1);
  });
  it('treeLeavesMinimumLevel', () => {
    const t0 = performance.now();
    treeLeavesMinimumLevel(numberTree);
    const t1 = performance.now();
    console.log('treeLeavesMinimumLevel ' + (t1 - t0), 'milliseconds');
    expect(treeLeavesMinimumLevel(numberTree)).toBe(2);
  });
  it('forestLeavesMinimumLevel', () => {
    const t0 = performance.now();
    forestLeavesMinimumLevel(theChildrenForest(numberTree));
    const t1 = performance.now();
    console.log('forestLeavesMinimumLevel ' + (t1 - t0), 'milliseconds');
    expect(forestLeavesMinimumLevel(theChildrenForest(numberTree))).toBe(1);
  });
});
