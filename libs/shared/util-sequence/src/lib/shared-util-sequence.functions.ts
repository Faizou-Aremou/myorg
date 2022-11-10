import { append, curry, equals, head, isEmpty, prepend, tail } from 'ramda';
import { Sequence } from './shared-util-sequence.types';



/**
 * [a], [b] -> [b]
 * @param sequence
 * @returns
 */
export function embelishMaxOfSequence<T>(
  isSup: (element1: T, element2: T) => boolean,
  sequence: Sequence<T>
): {
  max: T;
  seq: Sequence<T>;
} {
  if (sequence.length === 0) {
    throw new Error('param must have a least one element');
  } else if (sequence.length === 1) {
    return { seq: [], max: sequence[0] };
  }
  const { max, seq } = embelishMaxOfSequence(isSup, tail(sequence));
  return isSup(max, head(sequence) as T)
    ? { max: max, seq: prepend(head(sequence) as T, seq) }
    : { max: head(sequence) as T, seq: prepend(max, seq) };
}

/**
 * a, [a] -> b
 * @param element
 * @param sequence
 * @returns
 */
export function embelishIncludes<T>(
  element: T,
  sequence: Sequence<T>
): { bool: boolean; seq: Sequence<T> } {
  if (isEmpty(sequence)) {
    return { bool: false, seq: [] };
  }
  const { bool, seq } = embelishIncludes(element, tail(sequence));
  if (bool) {
    return { bool, seq: [head(sequence) as T, ...seq] };
  }
  if (!bool && equals(element, head(sequence) as T)) {
    return { bool: true, seq };
  }

  return { bool, seq: [head(sequence) as T, ...seq] };
}

export function embelishSlipInTwo<T>(sequence: Sequence<T>): {
  sequencePart1: Sequence<T>;
  sequencePart2: Sequence<T>;
  halfOfSequenceSize: number;
  sequenceSize: number;
} {
  switch (sequence.length) {
    case 0:
      return {
        sequencePart1: [],
        sequencePart2: [],
        halfOfSequenceSize: 0,
        sequenceSize: 0,
      };
    case 1:
      return {
        sequencePart1: [],
        sequencePart2: [sequence[0]],
        halfOfSequenceSize: 0,
        sequenceSize: 1,
      };
    case 2:
      return {
        sequencePart1: [sequence[0]],
        sequencePart2: [sequence[1]],
        halfOfSequenceSize: 1,
        sequenceSize: 2,
      };
    default: {
      const { sequencePart1, sequencePart2, halfOfSequenceSize, sequenceSize } =
        embelishSlipInTwo(tail(sequence));
      if ((sequenceSize + 1) % 2 === 0) {
        return {
          sequencePart1: prepend(head(sequence) as T, sequencePart1),
          sequencePart2: sequencePart2,
          halfOfSequenceSize: (sequenceSize + 1) / 2,
          sequenceSize: sequenceSize + 1,
        };
      } else {
        return {
          sequencePart1,
          sequencePart2: prepend(head(sequence) as T, sequencePart2),
          halfOfSequenceSize: sequenceSize / 2,
          sequenceSize: sequenceSize + 1,
        };
      }
    }
  }
}

/**
 * classement:: [a], [a] -> [a]
 */
export function InterClassement<T>(
  isInf: (element1: T, element2: T) => boolean,
  sequence1: Sequence<T>,
  sequence2: Sequence<T>
): Sequence<T> {
  if (sequence1.length === 0 && sequence2.length === 0) {
    return [];
  }
  if (sequence1.length === 1 && sequence2.length === 0) {
    return [...sequence1];
  }
  if (sequence1.length === 0 && sequence2.length === 1) {
    return [...sequence2];
  }
  if (sequence1.length === 1 && sequence2.length === 1) {
    return isInf(sequence1[0], sequence2[0])
      ? [...sequence1, ...sequence2]
      : [...sequence2, ...sequence1];
  }

  return (head(sequence1) as T) <= (head(sequence2) as T)
    ? prepend(
        head(sequence1) as T,
        InterClassement(isInf, tail(sequence1), sequence2)
      )
    : prepend(
        head(sequence2) as T,
        InterClassement(isInf, sequence1, tail(sequence2))
      );
}
/**
 * [element], [element] -> boolean
 * @param sequence1
 * @param sequence2
 * @returns
 */
export function hasSameSise<T>(
  sequence1: Sequence<T>,
  sequence2: Sequence<T>
): boolean {
  return sequence1.length === sequence2.length;
}

/**
 * [a], [a] -> b
 * @param sequence1
 * @param sequence2
 * @returns true if both sequences has same elements whatever the order
 */
export function hasSameElements<T>(
  sequence1: Sequence<T>,
  sequence2: Sequence<T>
): boolean {
  if (isEmpty(sequence1) && isEmpty(sequence2)) {
    return true;
  }
  if (isEmpty(sequence1) && !isEmpty(sequence2)) {
    return false;
  }
  if (!isEmpty(sequence1) && isEmpty(sequence2)) {
    return false;
  }
  const { bool, seq } = embelishIncludes(head(sequence1) as T, sequence2);
  return bool && hasSameElements(tail(sequence1), seq);
}

export function interClassementSort<T>(
  isInf: (element1: T, element2: T) => boolean,
  sequence: Sequence<T>
): Sequence<T> {
  switch (sequence.length) {
    case 0:
      return [];
    case 1:
      return [...sequence];
    default: {
      const [sequence1, sequence2] = slipInTwoPart(sequence);
      return InterClassement(
        isInf,
        interClassementSort(isInf, sequence1),
        interClassementSort(isInf, sequence2)
      );
    }
  }
}

/**
 *insertion:: [T], T, fn -> [T]
 */
export function insertion<T>(
  isSup: (element1: T, element2: T) => boolean,
  list: T[],
  element: T
): T[] {
  switch (list.length) {
    case 0:
      return [element];
    default:
      return isSup(head(list) as T, element)
        ? [element, head(list) as T, ...tail(list)]
        : [head(list) as T, ...insertion(isSup, tail(list), element)];
  }
}
/**
 * insertionSort:: [T], fn -> [T]
 */

export function insertionSort<T>(
  isSup: (element1: T, element2: T) => boolean,
  list: T[]
): T[] {
  return isEmpty(list)
    ? []
    : insertion<T>(isSup, insertionSort(isSup, tail(list)), head(list) as T);
}
export const insertionSortCurring = curry(insertionSort);

/**
 * quickSort:: [T], fn -> [T]
 */

export function quickSort<T>(
  supComparisonFn: (element1: T, element2: T) => boolean,
  sequence: T[]
): T[] {
  switch (sequence.length) {
    case 0:
      return [];
    case 1:
      return sequence.slice();
    default: {
      const { inferiorSequence, superiorSequence } = sliceSort(
        supComparisonFn,
        tail(sequence),
        head(sequence) as T
      );
      return [
        ...quickSort(supComparisonFn, inferiorSequence),
        head(sequence) as T,
        ...quickSort(supComparisonFn, superiorSequence),
      ];
    }
  }
}

/**
 * [a] -> [a]
 * @param sequence
 * @returns
 */
export function maxSearchSort<T>(
  isSup: (element1: T, element2: T) => boolean,
  sequence: Sequence<T>
): Sequence<T> {
  if (isEmpty(sequence)) {
    return [];
  } else {
    const { max, seq } = embelishMaxOfSequence(isSup, sequence);
    return append(max, maxSearchSort(isSup, seq));
  }
}

/**
 *
 * @param index
 * @param param1
 * @returns
 */
export function sliceUntil<T>(index: number, sequence: Sequence<T>): Sequence<T> {
  if (index === 0 && sequence.length === 0) {
    return [];
  } else if (index > 0 && sequence.length === 0) {
    return [];
  } else if (index === 0 && sequence.length > 0) {
    return [];
  }
  return prepend(head(sequence) as T, sliceUntil(index - 1, tail(sequence)));
}

/**
 * sliceSort:: [T], element, fn -> { inferiorSequence: T[]; superiorSequence: T[] }
 */
export function sliceSort<T>(
  supComparisonFn: (element1: T, element2: T) => boolean,
  sequence: T[],
  element: T
): { inferiorSequence: T[]; superiorSequence: T[] } {
  switch (sequence.length) {
    case 0:
      return { inferiorSequence: [], superiorSequence: [] };
    case 1:
      return supComparisonFn(head(sequence) as T, element)
        ? { inferiorSequence: [], superiorSequence: sequence.slice() }
        : {
            inferiorSequence: sequence.slice(),
            superiorSequence: [],
          };
    default: {
      const { inferiorSequence, superiorSequence } = sliceSort(
        supComparisonFn,
        tail(sequence),
        element
      );
      return (head(sequence) as T) > element
        ? {
            inferiorSequence: inferiorSequence,
            superiorSequence: prepend(head(sequence) as T, superiorSequence),
          }
        : {
            inferiorSequence: prepend(head(sequence) as T, inferiorSequence),
            superiorSequence: superiorSequence,
          };
    }
  }
}

export function slipInTwoPart<T>(sequence: Sequence<T>): [Sequence<T>, Sequence<T>] {
  const { sequencePart1, sequencePart2, halfOfSequenceSize, sequenceSize } =
    embelishSlipInTwo(sequence);
  return [sequencePart1, sequencePart2];
}

export function isSingleton<T>(sequence: Sequence<T>){
  return sequence.length === 1;
}
//-------------------------------------------------------------------------------------------String Sequences functions----------------------------------------------------------------------------------------
export function trimSequence(sequence: Sequence<string>): Sequence<string> {
  if (sequence.length === 0) {
    return [];
  }
  return prepend(
    (head(sequence) as string).trim(),
    trimSequence(tail(sequence))
  );
}
