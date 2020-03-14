import {
  makeBinaryTree,
  makeBinaryTreeNode,
  BinaryTree,
  BinaryTreeNode,
} from "./makeBinaryTree"

export type BinarySearchTreeNode<T> = BinaryTreeNode<T> & {}

export type BinarySearchTree<T> = BinaryTree<T> & {
  search: (value: T) => BinaryTreeNode<T> | null
  insert: (value: T) => void
}

export function makeBinarySearchTreeNode<T>(
  nodeValue: T,
): BinarySearchTreeNode<T> {
  const treeNode = makeBinaryTreeNode(nodeValue)

  return {
    ...treeNode,
  }
}

export function makeBinarySearchTree<T>() {
  const binaryTree = makeBinaryTree<T>()

  function search(value: T) {
    const root = binaryTree.getRoot()
    if (root == null) return null
    return _search(root, value)
  }

  /**
   * Inserts the value as a leaf vertex.
   */
  function insert(value: T) {
    let node = binaryTree.getRoot()
    if (node == null) binaryTree.setRoot(makeBinarySearchTreeNode(value))
    while (node != null) {
      if (value === node.value) return
      else if (value > node.value) {
        const nextNode = node.getRight()
        if (nextNode != null) node = nextNode
        else return node.setRight(makeBinarySearchTreeNode(value))
      } else if (value < node.value) {
        const nextNode = node.getLeft()
        if (nextNode != null) node = nextNode
        else return node.setLeft(makeBinarySearchTreeNode(value))
      }
    }
  }

  return { ...binaryTree, search, insert }
}

function _search<T>(
  node: BinarySearchTreeNode<T>,
  value: T,
): BinarySearchTreeNode<T> | null {
  if (value === node.value) return node
  const nextNode = value > node.value ? node.getRight() : node.getLeft()
  return nextNode ? _search(nextNode, value) : null
}
