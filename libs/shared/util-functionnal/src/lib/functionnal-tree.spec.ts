import { Tree } from '../interfaces/tree';
import {
  childrenForest,
  forestLeavesMinimumLevel,
  isSingleton,
  maxDegree,
  maxForestDegree,
  root,
  treeLeavesMinimumLevel,
} from './functionnal-tree';

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
    childrenForest(numberTree);
    const t1 = performance.now();
    console.log('childrenForest ' + (t1 - t0), 'milliseconds');
    expect(childrenForest(numberTree)).toEqual([
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
  it('isSingleton', () => {
    const t0 = performance.now();
    isSingleton(numberTree);
    const t1 = performance.now();
    console.log('isSingleton ' + (t1 - t0), 'milliseconds');
    expect(
      isSingleton({
        root: 1,
        forest: [],
      })
    ).toBe(true);
    expect(isSingleton(numberTree)).toBe(false);
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
    maxForestDegree(childrenForest(numberTree));
    const t1 = performance.now();
    console.log('maxForestDegree ' + (t1 - t0), 'milliseconds');
    expect(maxForestDegree(childrenForest(numberTree))).toBe(10);
  });
  it('root', () => {
    const t0 = performance.now();
    root(numberTree);
    const t1 = performance.now();
    console.log('root ' + (t1 - t0), 'milliseconds');
    expect(root(numberTree)).toBe(1);
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
    forestLeavesMinimumLevel(childrenForest(numberTree));
    const t1 = performance.now();
    console.log('forestLeavesMinimumLevel ' + (t1 - t0), 'milliseconds');
    expect(forestLeavesMinimumLevel(childrenForest(numberTree))).toBe(1);
  });
});
