export function testModule(): string {
  return 'it works';
}

export function calculateSizeFor<T extends { size: number }>(
    data: T[]
  ): number {
    const initialSize = 0;
    return data.reduce((size, element) => {
      return size + element.size;
    }, initialSize);
  }
  /**
   * 
   * @param number 
   * @returns 
   */
  export function removeOne(number: number): number {
    return number - 1;
  }
  
  
  
  
  
  //--------------------------------------Predicates---------------------------------------------
  /**
   * numberCompare:: T, T -> boolean
   */
   export function isSupNumber<T>(element1: T, element2: T): boolean {
    return element1 >= element2;
  }
  
  export function isInfNumber<T>(element1: T, element2: T): boolean {
    return element1 <= element2;
  }