export type BinaryTreeNode<T> = {
  value: T
  getDepth: () => number
  inOrderVertices: () => Generator<T, void, unknown>
  preOrderVertices: () => Generator<T, void, unknown>
  postOrderVertices: () => Generator<T, void, unknown>
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

  /**
   * Retrieves the maximum depth of the tree.
   */
  function getDepth() {
    return Math.max(left?.getDepth() ?? 0, right?.getDepth() ?? 0) + 1
  }

  /**
   * Sets the **left** vertex.
   */
  function setLeft(node: BinaryTreeNode<T> | null) {
    left = node
  }

  /**
   * Sets the **right** vertex.
   */
  function setRight(node: BinaryTreeNode<T> | null) {
    right = node
  }

  /**
   * Retrieves the **left** vertex.
   */
  function getLeft() {
    return left
  }

  /**
   * Retrieves the **right** vertex.
   */
  function getRight() {
    return right
  }

  /**
   * Retrieves an Iterable that loads the node **left** branch
   * vertices values, then the **current** vertex value, and then
   * the **right** branch vertices values
   * Syntax:
   * ```
   * for (const value of node.inOrderVertices()) {
   *   ...
   * }
   * ```
   */
  function* inOrderVertices() {
    left?.inOrderVertices()
    yield value
    right?.inOrderVertices()
  }

  /**
   * Retrieves an Iterable that loads the **current** vertex value,
   * then the node **left** branch vertices values, and then the
   *  **right** branch vertices values.
   * Root vertex value is always the first one to be loaded
   * Syntax:
   * ```
   * for (const value of node.preOrderVertices()) {
   *   ...
   * }
   * ```
   */
  function* preOrderVertices() {
    yield value
    left?.preOrderVertices()
    right?.preOrderVertices()
  }

  /**
   * Retrieves an Iterable that loads the node **left** branch
   * vertices values, then the **current** vertex value, and then
   * the **right** branch vertices values
   * Root vertex value is always the last one to be loaded
   * Syntax:
   * ```
   * for (const value of node.postOrderVertices()) {
   *   ...
   * }
   * ```
   */
  function* postOrderVertices() {
    left?.postOrderVertices()
    right?.postOrderVertices()
    yield value
  }

  return {
    value,
    getDepth,
    setLeft,
    setRight,
    getLeft,
    getRight,
    inOrderVertices,
    preOrderVertices,
    postOrderVertices,
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
