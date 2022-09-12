import { compose } from 'ramda';
import {
  binaryTreeFrom,
  existLeft,
  existRight,
  binaryTreeInfixedLeftRightSequences,
  infixedLinearization,
  hasHisTwoChildren,
  levelLinearization,
  binaryTreeLeavesMinimumLevel,
  numberOfDescendantsOf,
  numberOfLeaves,
  numberOfNodes,
  postfixedLinearization,
  prefixedLinearization,
  subNodeOf,
  isEmptyTree,
  binaryTreesElementsIsEquals,
  isSingleton,
  binaryTreeDepth,
  levelFor,
  isSameStructure,
  isUnaryRight,
  isUnaryLeft,
  embelishLevelFor,
  binaryTreePrefixedLeftRightSequences,
  BinaryNode,
  theLeftChild,
  theRightChild,
  theRoot,
} from './binary-tree';

const numberBinaryTree: BinaryNode<number> = {
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
const prefixedLinerizedUppercaseAlphabetTree = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
];
const infixedLinerizedUppercaseAlphabetTree = [
  'C',
  'B',
  'A',
  'E',
  'D',
  'G',
  'F',
];
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
  it('binaryTreeDepth', () => {
    const t0 = performance.now();


    binaryTreeDepth(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('binaryTreeDepth ' + (t1 - t0), 'milliseconds');
    expect(binaryTreeDepth(uppercaseAlphabetTree)).toBe(4);
  });
  it('binaryTreesElementsIsEquals', () => {
    const t0 = performance.now();
    binaryTreesElementsIsEquals(uppercaseAlphabetTree, uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('binaryTreesElementsIsEquals ' + (t1 - t0), 'milliseconds');
    expect(
      binaryTreesElementsIsEquals(uppercaseAlphabetTree, {
        root: 'A',
        leftChild: {
          root: 'B',
          leftChild: {
            root: 'C',
          },
          rightChild: {
            root: 'G',
          },
        },
        rightChild: {
          root: 'D',
          leftChild: {
            root: 'E',
          },
          rightChild: {
            root: 'F',
          },
        },
      })
    ).toBe(true);
    expect(
      binaryTreesElementsIsEquals(uppercaseAlphabetTree, {
        root: 'A',
        leftChild: {
          root: 'B',
          leftChild: {
            root: 'C',
          },
          rightChild: {
            root: 'K',
          },
        },
        rightChild: {
          root: 'D',
          leftChild: {
            root: 'E',
          },
          rightChild: {
            root: 'F',
          },
        },
      })
    ).toBe(false);
  });
  it('binaryNodeFrom', () => {
    const t0 = performance.now();
    binaryTreeFrom(
      prefixedLinerizedUppercaseAlphabetTree,
      infixedLinerizedUppercaseAlphabetTree
    );
    const t1 = performance.now();
    console.log('binaryNodeFrom ' + (t1 - t0), 'milliseconds');
    expect(
      binaryTreeFrom(
        prefixedLinerizedUppercaseAlphabetTree,
        infixedLinerizedUppercaseAlphabetTree
      )
    ).toEqual(uppercaseAlphabetTree);
    expect(() => {
      binaryTreeFrom(
        prefixedLinerizedUppercaseAlphabetTree,
        postfixedLinerizedlowercaseAlphabetTree
      );
    }).toThrowError("arguments doesn't have same size");
    expect(() => {
      binaryTreeFrom(prefixedLinerizedUppercaseAlphabetTree, [
        'C',
        'B',
        'C',
        'E',
        'D',
        'G',
        'F',
      ]);
    }).toThrowError("arguments doesn't have same value");
  });
  it('binaryTreeInfixedLeftRightSequences', () => {
    const t0 = performance.now();
    binaryTreeInfixedLeftRightSequences(
      'A',
      infixedLinerizedUppercaseAlphabetTree
    );
    const t1 = performance.now();
    console.log(
      'binaryTreeInfixedLeftRightSequences ' + (t1 - t0),
      'milliseconds'
    );
    expect(
      binaryTreeInfixedLeftRightSequences(
        'A',
        infixedLinerizedUppercaseAlphabetTree
      )
    ).toEqual({
      root: 'A',
      binaryTreeLeftChildInfixedLinearization: ['C', 'B'],
      binaryTreeRightChildInfixedLinearization: ['E', 'D', 'G', 'F'],
      binaryTreeLeftChildInfixedLinearizationSize: 2,
    });
    expect(binaryTreeInfixedLeftRightSequences('A', ['C', 'B'])).toEqual({
      root: null,
      binaryTreeLeftChildInfixedLinearization: [],
      binaryTreeRightChildInfixedLinearization: ['C', 'B'],
      binaryTreeLeftChildInfixedLinearizationSize: 0,
    });
  });
  it('binaryTreePrefixedLeftRightSequences', () => {
    const t0 = performance.now();
    binaryTreePrefixedLeftRightSequences(
      2,
      prefixedLinerizedUppercaseAlphabetTree
    );
    const t1 = performance.now();
    console.log(
      'binaryTreePrefixedLeftRightSequences ' + (t1 - t0),
      'milliseconds'
    );
    expect(
      binaryTreePrefixedLeftRightSequences(2, ['B', 'C', 'D', 'E', 'F', 'G'])
    ).toEqual({
      binaryTreeLeftChildPrefixedLinearization: ['B', 'C'],
      binaryTreeRightChildPrefixedLinearization: ['D', 'E', 'F', 'G'],
    });
  });
  it('embelishLevelFor', () => {
    const t0 = performance.now();
    embelishLevelFor(
      {
        root: 'C',
      },
      uppercaseAlphabetTree
    );
    const t1 = performance.now();
    console.log('embelishLevelFor ' + (t1 - t0), 'milliseconds');
    expect(
      embelishLevelFor(
        {
          root: 'C',
        },
        uppercaseAlphabetTree
      )
    ).toEqual({ hasNode: true, level: 3 });
    expect(
      embelishLevelFor(
        {
          root: 'Z',
        },
        uppercaseAlphabetTree
      )
    ).toEqual({ hasNode: false, level: 0 });
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
  it('hasHisTwoChildren', () => {
    const t0 = performance.now();
    hasHisTwoChildren(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('hasHisTwoChildren ' + (t1 - t0), 'milliseconds');
    expect(hasHisTwoChildren(uppercaseAlphabetTree)).toBe(true);
    expect(
      compose(hasHisTwoChildren, subNodeOf)('F', uppercaseAlphabetTree)
    ).toBe(false);
  });

  it('infixedLinearization', () => {
    const t0 = performance.now();
    infixedLinearization(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('infixedLinearization ' + (t1 - t0), 'milliseconds');
    expect(infixedLinearization(uppercaseAlphabetTree)).toEqual(
      infixedLinerizedUppercaseAlphabetTree
    );
    expect(infixedLinearization(undefined)).toEqual([]);
  });
  it('isEmptyTree', () => {
    const t0 = performance.now();
    isEmptyTree(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('isEmptyTree ' + (t1 - t0), 'milliseconds');
    expect(isEmptyTree(uppercaseAlphabetTree)).toBe(false);
    expect(isEmptyTree(undefined)).toBe(true);
    expect(compose(isEmptyTree, subNodeOf)('D', uppercaseAlphabetTree)).toBe(
      false
    );
  });

  it('isSingleton', () => {
    const t0 = performance.now();
    isSingleton(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('isSingleton ' + (t1 - t0), 'milliseconds');
    expect(isSingleton(uppercaseAlphabetTree)).toBe(false);
    expect(compose(isSingleton, subNodeOf)('C', uppercaseAlphabetTree));
  });
  it('isUnaryLeft', () => {
    const t0 = performance.now();
    isUnaryLeft(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('isUnaryLeft ' + (t1 - t0), 'milliseconds');
    expect(isUnaryLeft(uppercaseAlphabetTree)).toBe(false);
    expect(compose(isUnaryLeft, subNodeOf)('B', uppercaseAlphabetTree)).toBe(
      true
    );
  });
  it('isUnaryRight', () => {
    const t0 = performance.now();
    isUnaryRight(lowcaseAlphabetTree);
    const t1 = performance.now();
    console.log('isUnaryRight ' + (t1 - t0), 'milliseconds');
    expect(isUnaryRight(lowcaseAlphabetTree)).toBe(false);
    expect(compose(isUnaryRight, subNodeOf)('d', lowcaseAlphabetTree)).toBe(
      true
    );
  });
  it('isSameStructure', () => {
    const t0 = performance.now();
    isSameStructure(uppercaseAlphabetTree, {
      root: 'Z',
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
    });
    const t1 = performance.now();
    console.log('isSameStructure ' + (t1 - t0), 'milliseconds');
    expect(
      isSameStructure(uppercaseAlphabetTree, {
        root: 'Z',
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
      })
    ).toBe(true);
    expect(
      isSameStructure(uppercaseAlphabetTree, {
        root: 'Z',
        leftChild: {
          root: 'B',
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
      })
    ).toBe(false);
  });
  it('theLeftChild', () => {
    const t0 = performance.now();
    theLeftChild(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('theLeftChild ' + (t1 - t0), 'milliseconds');
    expect(theLeftChild(uppercaseAlphabetTree)).toEqual({
      root: 'B',
      leftChild: {
        root: 'C',
      },
    });
  });
  it('levelFor', () => {
    const t0 = performance.now();
    levelFor(
      {
        root: 'G',
      },
      uppercaseAlphabetTree
    );
    const t1 = performance.now();
    console.log('levelFor ' + (t1 - t0), 'milliseconds');
    expect(
      levelFor(
        {
          root: 'G',
        },
        uppercaseAlphabetTree
      )
    ).toBe(4);
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
  it('binaryTreeLeavesMinimumLevel', () => {
    const t0 = performance.now();
    binaryTreeLeavesMinimumLevel(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('binaryTreeLeavesMinimumLevel ' + (t1 - t0), 'milliseconds');
    expect(binaryTreeLeavesMinimumLevel(uppercaseAlphabetTree)).toBe(3);
  });
  it('numberOfNodes', () => {
    const t0 = performance.now();
    numberOfNodes(numberBinaryTree);
    const t1 = performance.now();
    console.log('"numberOfNodes" ' + (t1 - t0), 'milliseconds');
    expect(numberOfNodes(numberBinaryTree)).toBe(7);
    expect(numberOfNodes(undefined)).toBe(0);
  });
  it('numberOfDescendantsOf', () => {
    const t0 = performance.now();
    numberOfDescendantsOf(5, numberBinaryTree);
    const t1 = performance.now();
    console.log('numberOfDescendantsOf ' + (t1 - t0), 'milliseconds');
    expect(numberOfDescendantsOf(5, numberBinaryTree)).toBe(2);
  });
  it('numberOfLeaves', () => {
    const t0 = performance.now();
    numberOfLeaves(numberBinaryTree);
    const t1 = performance.now();
    console.log('numberOfLeaves ' + (t1 - t0), 'milliseconds');
    expect(numberOfLeaves(numberBinaryTree)).toBe(4);
  });
  it('minimumLevelOfLeaves', () => {
    const t0 = performance.now();
    binaryTreeLeavesMinimumLevel(numberBinaryTree);
    const t1 = performance.now();
    console.log('minimumLevelOfLeaves ' + (t1 - t0), 'milliseconds');
    expect(binaryTreeLeavesMinimumLevel(numberBinaryTree)).toBe(3);
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
  it('theRightChild', () => {
    const t0 = performance.now();
    theRightChild(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('theRightChild ' + (t1 - t0), 'milliseconds');
    expect(theRightChild(uppercaseAlphabetTree)).toEqual({
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
    });
  });
  it('theRoot', () => {
    const t0 = performance.now();
    theRoot(uppercaseAlphabetTree);
    const t1 = performance.now();
    console.log('rootOf ' + (t1 - t0), 'milliseconds');
    expect(theRoot(uppercaseAlphabetTree)).toEqual('A');
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
