import { BinaryNode } from '../interfaces/binary-node';
import {
  binaryNodeFrom,
  existLeft,
  existRight,
  infixedLinearization,
  levelLinearization,
  minimumLevelOfLeaves,
  numberOfDescendantsOf,
  numberOfLeaves,
  numberOfNodes,
  postfixedLinearization,
  prefixedLinearization,
  subNodeOf,
} from './functionnal-binary-tree';

const numberTree: BinaryNode<number> = {
  root: 1,
  leftChild: {
    root: 2,
    leftChild: {
      root: 3,
    },
    rightChild: {
      root: 4,
    },
  },
  rightChild: {
    root: 5,
    leftChild: {
      root: 6,
    },
    rightChild: {
      root: 7,
    },
  },
};
const uppercaseAlphabetTree: BinaryNode<string> = {
  root: 'A',
  leftChild: {
    root: 'B',
    leftChild: {
      root: 'C',
    },
  },
  rightChild: {
    root: 'D',
    leftChild: {
      root: 'E',
    },
    rightChild: {
      root: 'F',
      leftChild: {
        root: 'G',
      },
    },
  },
};

const lowcaseAlphabetTree: BinaryNode<string> = {
  root: 'a',
  leftChild: {
    root: 'b',
    leftChild: {
      root: 'd',
      rightChild: {
        root: 'h',
      },
    },
    rightChild: {
      root: 'e',
      rightChild: {
        root: 'i',
      },
    },
  },
  rightChild: {
    root: 'c',
    leftChild: {
      root: 'f',
      leftChild: {
        root: 'j',
      },
      rightChild: {
        root: 'k',
      },
    },
    rightChild: {
      root: 'g',
    },
  },
};
const prefixedLinerizedAlphabetTree = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const infixedLinerizedAlphabetTree = ['C', 'B', 'A', 'E', 'D', 'G', 'F'];
const postfixedLinerizedlowercaseAlphabetTree = [
  'h',
  'd',
  'i',
  'e',
  'b',
  'j',
  'k',
  'f',
  'g',
  'c',
  'a',
];
const prefixedfixedLinerizedlowercaseAlphabetTree = [
  'a',
  'b',
  'd',
  'h',
  'e',
  'i',
  'c',
  'f',
  'j',
  'k',
  'g',
];

describe('functionnal binary tree ', () => {
  it('binaryNodeFrom', () => {
    const t0 = performance.now();
    binaryNodeFrom(prefixedLinerizedAlphabetTree, infixedLinerizedAlphabetTree);
    const t1 = performance.now();
    console.log('binaryNodeFrom ' + (t1 - t0), 'milliseconds');
    expect(
      binaryNodeFrom(
        prefixedLinerizedAlphabetTree,
        infixedLinerizedAlphabetTree
      )
    ).toEqual(uppercaseAlphabetTree);
  });
  it('infixedLinearization', () => {
    const t0 = performance.now();
    infixedLinearization(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('infixedLinearization ' + (t1 - t0), 'milliseconds');
    expect(infixedLinearization(uppercaseAlphabetTree)).toEqual(
      infixedLinerizedAlphabetTree
    );
  });
  it('existLeft', () => {
    const t0 = performance.now();
    existLeft(lowcaseAlphabetTree);
    const t1 = performance.now();
    console.log('existLeft ' + (t1 - t0), 'milliseconds');
    expect(existLeft(lowcaseAlphabetTree)).toBe(true);
    expect(existLeft(subNodeOf('g', lowcaseAlphabetTree))).toBe(false);
  });
  it('existRight', () => {
    const t0 = performance.now();
    existRight(lowcaseAlphabetTree);
    const t1 = performance.now();
    console.log('existRight ' + (t1 - t0), 'milliseconds');
    expect(existRight(lowcaseAlphabetTree)).toBe(true);
    expect(existRight(subNodeOf('g', lowcaseAlphabetTree))).toBe(false);
  });
  it('levelLinearization', () => {
    const t0 = performance.now();
    levelLinearization(lowcaseAlphabetTree);
    const t1 = performance.now();
    console.log('levelLinearization ' + (t1 - t0), 'milliseconds');
    expect(levelLinearization(lowcaseAlphabetTree)).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
    ]);
  });
  it('numberOfNodes', () => {
    const t0 = performance.now();
    numberOfNodes(numberTree);
    const t1 = performance.now();
    console.log('"numberOfNodes" ' + (t1 - t0), 'milliseconds');
    expect(numberOfNodes(numberTree)).toBe(7);
    expect(numberOfNodes(undefined)).toBe(0);
  });
  it('numberOfDescendantsOf', () => {
    const t0 = performance.now();
    numberOfDescendantsOf(5, numberTree);
    const t1 = performance.now();
    console.log('numberOfDescendantsOf ' + (t1 - t0), 'milliseconds');
    expect(numberOfDescendantsOf(5, numberTree)).toBe(2);
  });
  it('numberOfLeaves', () => {
    const t0 = performance.now();
    numberOfLeaves(numberTree);
    const t1 = performance.now();
    console.log('numberOfLeaves ' + (t1 - t0), 'milliseconds');
    expect(numberOfLeaves(numberTree)).toBe(4);
  });
  it('minimumLevelOfLeaves', () => {
    const t0 = performance.now();
    minimumLevelOfLeaves(numberTree);
    const t1 = performance.now();
    console.log('minimumLevelOfLeaves ' + (t1 - t0), 'milliseconds');
    expect(minimumLevelOfLeaves(numberTree)).toBe(3);
  });
  it('prefixedLinearization', () => {
    const t0 = performance.now();
    prefixedLinearization(lowcaseAlphabetTree);
    const t1 = performance.now();
    console.log('prefixedLinearization ' + (t1 - t0), 'milliseconds');
    expect(prefixedLinearization(lowcaseAlphabetTree)).toEqual(
      prefixedfixedLinerizedlowercaseAlphabetTree
    );
  });
  it('postfixedLinearization', () => {
    const t0 = performance.now();
    postfixedLinearization(lowcaseAlphabetTree);
    const t1 = performance.now();
    console.log('postfixedLinearization ' + (t1 - t0), 'milliseconds');
    expect(postfixedLinearization(lowcaseAlphabetTree)).toEqual(
      postfixedLinerizedlowercaseAlphabetTree
    );
  });
  it('subNodeOf', () => {
    const t0 = performance.now();
    subNodeOf('b', lowcaseAlphabetTree);
    const t1 = performance.now();
    console.log('subNodeOf ' + (t1 - t0), 'milliseconds');
    expect(subNodeOf('b', lowcaseAlphabetTree)).toEqual({
      root: 'b',
      leftChild: {
        root: 'd',
        rightChild: {
          root: 'h',
        },
      },
      rightChild: {
        root: 'e',
        rightChild: {
          root: 'i',
        },
      },
    });
  });
});
