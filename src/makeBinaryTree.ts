export type BinaryTreeNode<T> = {
  value: T
  getDepth: () => number
  setLeft: (node: BinaryTreeNode<T> | null) => void
  setRight: (node: BinaryTreeNode<T> | null) => void
  getLeft: () => BinaryTreeNode<T> | null
  getRight: () => BinaryTreeNode<T> | null
}

export type BinaryTree<T> = {
  setRoot: (node: BinaryTreeNode<T>) => void
  getRoot: () => BinaryTreeNode<T> | null
  getDepth: () => number
}

export function makeBinaryTreeNode<T>(nodeValue: T): BinaryTreeNode<T> {
  const value = nodeValue
  let left: BinaryTreeNode<T> | null = null
  let right: BinaryTreeNode<T> | null = null

  function getDepth() {
    return Math.max(left?.getDepth() ?? 0, right?.getDepth() ?? 0) + 1
  }

  function setLeft(node: BinaryTreeNode<T> | null) {
    left = node
  }

  function setRight(node: BinaryTreeNode<T> | null) {
    right = node
  }

  function getLeft() {
    return left
  }

  function getRight() {
    return right
  }

  return {
    value,
    getDepth,
    setLeft,
    setRight,
    getLeft,
    getRight,
  }
}

export function makeBinaryTree<T>(): BinaryTree<T> {
  let rootNode: BinaryTreeNode<T> | null = null

  function setRoot(node: BinaryTreeNode<T>) {
    rootNode = node
  }

  function getRoot() {
    return rootNode
  }

  function getDepth() {
    return rootNode?.getDepth() ?? 0
  }

  return { setRoot, getRoot, getDepth }
}
