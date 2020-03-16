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

function makeBinarySearchTreeNode<T>(nodeValue: T): BinarySearchTreeNode<T> {
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

  /**
   * Deletes the vertex with the specified value.
   */
  function remove(value: T) {
    const root = binaryTree.getRoot()
    if (root == null) return false

    // Finds the node with the specified value and
    // the branch direction where that node is located.
    let branch: "left" | "right" = "left"
    let node = root
    while (node?.value != value) {
      let nextNode = null
      if (value > node.value) {
        nextNode = node.getRight()
        branch = "right"
      } else {
        nextNode = node.getLeft()
        branch = "left"
      }
      if (nextNode == null) return false
      node = nextNode
    }

    // Retrieves the node's children data details.
    if (node == null) return
    const childrenDetails = getNodeChildrenDetails(node)

    // Sets *replacementNode*, which will replace the node
    // with the specified value.
    let replacementNode = null
    switch (childrenDetails.type) {
      // In case there are no children, simply replace the node with null.
      case "no-children":
        replacementNode = null
        break
      case "left":
      case "right":
        // In case there's only one branch, replace the node with the
        // first branch vertex.
        replacementNode = childrenDetails.node
        break
      case "both-children":
        // In case there are both branches, replace the node with the
        // bottom-left-most leaf from the right branch - AKA the vertex with
        // the lowest bigger value.
        let lowestBiggerLeaf: BinarySearchTreeNode<T> | null =
          childrenDetails.right
        while (lowestBiggerLeaf?.getLeft() != null) {
          lowestBiggerLeaf = lowestBiggerLeaf.getLeft()
        }
        // Remove the *lowestBiggerLeaf* from it's original position
        lowestBiggerLeaf?.getParent()?.setLeft(null)
        replacementNode = lowestBiggerLeaf
        break
    }

    // replace the actual node
    switch (branch) {
      case "left":
        node.getParent()?.setLeft(replacementNode)
        break
      case "right":
        node.getParent()?.setRight(replacementNode)
        break
    }
  }

  return { ...binaryTree, search, insert, remove }
}

/**
 * Helper that searches recursively for the node with
 * the specified value.
 */
function _search<T>(
  node: BinarySearchTreeNode<T>,
  value: T,
): BinarySearchTreeNode<T> | null {
  if (value === node.value) return node
  const nextNode = value > node.value ? node.getRight() : node.getLeft()
  return nextNode ? _search(nextNode, value) : null
}

/**
 * Retrieves details data on a node children
 */
function getNodeChildrenDetails<T>(
  node: BinarySearchTreeNode<T>,
):
  | { type: "no-children" }
  | { type: "left" | "right"; node: BinarySearchTreeNode<T> }
  | {
      type: "both-children"
      left: BinarySearchTreeNode<T>
      right: BinarySearchTreeNode<T>
    } {
  const left = node.getLeft()
  const right = node.getRight()
  if (left != null && right == null) return { type: "left", node: left }
  if (left == null && right != null) return { type: "right", node: right }
  if (left != null && right != null)
    return { type: "both-children", left, right }
  return { type: "no-children" }
}
