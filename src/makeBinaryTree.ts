export type BinaryTreeNode<T> = {
  value: T
  getDepth: () => number
  inOrderVertices: () => Generator<T, void, unknown>
  preOrderVertices: () => Generator<T, void, unknown>
  postOrderVertices: () => Generator<T, void, unknown>
  getParent: () => BinaryTreeNode<T> | null
  _setParent: (node: BinaryTreeNode<T> | null) => void
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
  let parent: BinaryTreeNode<T> | null = null

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
    left?._setParent(treeNode)
  }

  /**
   * Sets the **right** vertex.
   */
  function setRight(node: BinaryTreeNode<T> | null) {
    right = node
    right?._setParent(treeNode)
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
   * Retrieves the vertex **parent**.
   */
  function getParent() {
    return parent
  }

  /**
   * @private
   * Sets the node's parent node.
   */
  function _setParent(node: BinaryTreeNode<T> | null) {
    parent = node
  }

  /**
   * Retrieves an Iterable that loads the node **left** branch
   * vertices values, then the **current** vertex value, and then
   * the **right** branch vertices values
   * Syntax:
   * ```
   * for (const key of node.inOrderVertices()) {
   *   ...
   * }
   * ```
   */
  function* inOrderVertices() {
    if (left) yield* left.inOrderVertices()
    yield value
    if (right) yield* right.inOrderVertices()
  }

  /**
   * Retrieves an Iterable that loads the **current** vertex value,
   * then the node **left** branch vertices values, and then the
   *  **right** branch vertices values.
   * Root vertex value is always the first one to be loaded
   * Syntax:
   * ```
   * for (const key of node.preOrderVertices()) {
   *   ...
   * }
   * ```
   */
  function* preOrderVertices() {
    yield value
    if (left) yield* left.preOrderVertices()
    if (right) yield* right.preOrderVertices()
  }

  /**
   * Retrieves an Iterable that loads the node **left** branch
   * vertices values, then the **current** vertex value, and then
   * the **right** branch vertices values
   * Root vertex value is always the last one to be loaded
   * Syntax:
   * ```
   * for (const key of node.postOrderVertices()) {
   *   ...
   * }
   * ```
   */
  function* postOrderVertices() {
    if (left) yield* left.postOrderVertices()
    if (right) yield* right.postOrderVertices()
    yield value
  }

  const treeNode = {
    value,
    getDepth,
    setLeft,
    setRight,
    getLeft,
    getRight,
    getParent,
    _setParent,
    inOrderVertices,
    preOrderVertices,
    postOrderVertices,
  }
  return treeNode
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
