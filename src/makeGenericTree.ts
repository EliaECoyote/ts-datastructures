export type TreeNode<T> = {
  value: T
  children: () => Generator<TreeNode<T>, void, unknown>
  addChild: (...node: TreeNode<T>[]) => void
  getDepth: () => number
  removeChild: (node: TreeNode<T>) => void
}

export type GenericTree<T> = {
  setRoot: (node: TreeNode<T>) => void
  getRoot: () => TreeNode<T> | null
  getDepth: () => number | undefined
}

export function makeTreeNode<T>(nodeValue: T): TreeNode<T> {
  const value = nodeValue
  const _children: TreeNode<T>[] = []

  function addChild(...node: TreeNode<T>[]) {
    _children.push(...node)
  }

  function removeChild(node: TreeNode<T>) {
    const index = _children.indexOf(node)
    if (index !== -1) _children.splice(index, 1)
  }

  function* children() {
    for (const child of _children) {
      yield child
    }
  }

  function getDepth() {
    let maxDepth = 1
    for (const child of children()) {
      const depth = child.getDepth() + 1
      if (depth > maxDepth) maxDepth = depth
    }
    return maxDepth
  }

  return {
    value,
    children,
    getDepth,
    addChild,
    removeChild,
  }
}

export function makeGenericTree<T>(): GenericTree<T> {
  let rootNode: TreeNode<T> | null = null

  function setRoot(node: TreeNode<T>) {
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
