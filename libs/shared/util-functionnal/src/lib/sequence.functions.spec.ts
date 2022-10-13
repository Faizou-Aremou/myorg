import {
  embelishSlipInTwo,
  embelishIncludes,
  embelishMaxOfSequence,
  hasSameElements,
  hasSameSise,
  sliceUntil,
  InterClassement,
  interClassementSort,
  insertionSort,
  insertion,
  trimSequence,
} from './sequence.functions';

import { isInfNumber, isSupNumber } from './common.functions';

const numberList = [12, 13, 20, 8, 3, 4, 0, 5, 3];
const words = ['spray', 'limit', 'elite', 'ola'];
const nbVictoriesList = [
  {
    name: 'jone',
    nbVictories: 12,
  },
  { name: 'gane', nbVictories: 13 },
  { name: 'nganou', nbVictories: 20 },
  { name: 'blades', nbVictories: 8 },
  { name: 'boubou', nbVictories: 3 },
  { name: 'cell', nbVictories: 4 },
  { name: 'tyson', nbVictories: 0 },
  { name: 'osy', nbVictories: 5 },
  { name: 'superman', nbVictories: 3 },
];

describe('functionnal sequences ', () => {
  it('embelishMaxForSequence', () => {
    expect(embelishMaxOfSequence(isSupNumber, [...numberList]).max).toBe(20);
    expect(
      hasSameElements(
        embelishMaxOfSequence(isSupNumber, [...numberList]).seq,
        [12, 13, 8, 3, 4, 0, 5, 3]
      )
    ).toBe(true);
  });

  it('embelishIncludes', () => {
    expect(embelishIncludes(12, [...numberList])).toEqual({
      bool: true,
      seq: [13, 20, 8, 3, 4, 0, 5, 3],
    });
    expect(embelishIncludes(14, [...numberList])).toEqual({
      bool: false,
      seq: [12, 13, 20, 8, 3, 4, 0, 5, 3],
    });
  });

  it('embelishSlipInTwo', () => {
    expect(embelishSlipInTwo([...numberList])).toEqual({
      sequencePart1: [13, 8, 4, 5],
      sequencePart2: [12, 20, 3, 0, 3],
      halfOfSequenceSize: 4,
      sequenceSize: 9,
    });
  });

  it('InterClassement', () => {
    expect(
      InterClassement(isInfNumber, [4, 5, 8, 13], [0, 3, 3, 12, 20])
    ).toEqual([0, 3, 3, 4, 5, 8, 12, 13, 20]);
  });

  it('hasSameSise: two list has same size', () => {
    expect(
      hasSameSise(
        [12, 13, 20, 8, 3, 4, 0, 5, 3],
        [16, 18, 20, 40, 3, 4, 0, 5, 3]
      )
    ).toBe(true);
    expect(
      hasSameSise([12, 13, 20, 8, 3, 4], [16, 18, 20, 40, 3, 4, 0, 5, 3])
    ).toBe(false);
  });

  it('hasSameElements: two list has same Elements', () => {
    expect(
      hasSameElements(
        [...nbVictoriesList],
        [
          { name: 'jone', nbVictories: 12 },
          { name: 'nganou', nbVictories: 20 },
          { name: 'boubou', nbVictories: 3 },
          { name: 'cell', nbVictories: 4 },
          { name: 'tyson', nbVictories: 0 },
          { name: 'osy', nbVictories: 5 },
          { name: 'gane', nbVictories: 13 },
          { name: 'superman', nbVictories: 3 },
          { name: 'blades', nbVictories: 8 },
        ]
      )
    ).toBe(true);
    expect(
      hasSameElements(
        [...nbVictoriesList],
        [
          { name: 'jone', nbVictories: 15 },
          { name: 'nganou', nbVictories: 20 },
          { name: 'boubou', nbVictories: 3 },
          { name: 'cell', nbVictories: 4 },
          { name: 'tyson', nbVictories: 0 },
          { name: 'osy', nbVictories: 5 },
          { name: 'gane', nbVictories: 13 },
          { name: 'superman', nbVictories: 3 },
          { name: 'blades', nbVictories: 8 },
        ]
      )
    ).toBe(false);
    expect(
      hasSameElements(
        [...nbVictoriesList],
        [
          { name: 'nganou', nbVictories: 20 },
          { name: 'boubou', nbVictories: 3 },
          { name: 'cell', nbVictories: 4 },
          { name: 'tyson', nbVictories: 0 },
          { name: 'osy', nbVictories: 5 },
          { name: 'gane', nbVictories: 13 },
          { name: 'superman', nbVictories: 3 },
          { name: 'blades', nbVictories: 8 },
        ]
      )
    ).toBe(false);
  });

  it('interClassementSort', () => {
    expect(interClassementSort(isInfNumber, numberList)).toEqual([
      0, 3, 3, 4, 5, 8, 12, 13, 20,
    ]);
  });

  it('insertion', () => {
    expect(insertion(isSupNumber, [12, 13, 20, 8, 3, 4, 0, 5], 3)).toEqual([
      3, 12, 13, 20, 8, 3, 4, 0, 5,
    ]);
  });

  it('insertionSort', () => {
    expect(insertionSort(isSupNumber, numberList)).toEqual([
      0, 3, 3, 4, 5, 8, 12, 13, 20,
    ]);
  });

  it('sliceUntil: slice list until 0', () => {
    expect(sliceUntil(0, words)).toEqual([]);
    expect(sliceUntil(1, words)).toEqual(['spray']);
    expect(sliceUntil(2, words)).toEqual(['spray', 'limit']);
    expect(sliceUntil(3, words)).toEqual(['spray', 'limit', 'elite']);
  });
  it('trimSequence', () => {
    expect(
      trimSequence(['nganou', ' curtis blades ', ' tai tuvasa ', 'gane'])
    ).toEqual(['nganou', 'curtis blades', 'tai tuvasa', 'gane']);
  });
});
