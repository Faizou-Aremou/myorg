export interface BinaryNode<T> {
    root: T;
    leftChild?:BinaryNode<T>;
    rightChild?:BinaryNode<T>;
}