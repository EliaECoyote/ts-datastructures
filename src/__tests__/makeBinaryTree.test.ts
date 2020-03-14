import { makeBinaryTree, makeBinaryTreeNode } from "../makeBinaryTree"

describe("with an empty tree...", () => {
  it("should have no root", () => {
    const tree = makeBinaryTree()
    expect(tree.getRoot()).toBe(null)
  })

  it("should have 0 depth", () => {
    const tree = makeBinaryTree()
    expect(tree.getDepth()).toBe(0)
  })
})

describe("with a root node...", () => {
  it("should have depth 1", () => {
    const tree = makeBinaryTree<number>()
    tree.setRoot(makeBinaryTreeNode(1))
    expect(tree.getDepth()).toBe(1)
  })

  it("should retrieve root correctly", () => {
    const node = makeBinaryTreeNode(1)
    const tree = makeBinaryTree<number>()
    tree.setRoot(node)
    expect(tree.getRoot()).toBe(node)
  })

  it("should support node value update", () => {
    const node = makeBinaryTreeNode(1)
    const tree = makeBinaryTree<number>()
    tree.setRoot(node)
    expect(tree.getRoot()?.value).toBe(1)
    tree.getRoot()!.value = 2
    expect(tree.getRoot()?.value).toBe(2)
  })
})

describe("when adding multiple nodes...", () => {
  it("should set nodes values correctly", () => {
    const tree = makeBinaryTree<number>()
    tree.setRoot(makeBinaryTreeNode(1))
    tree.getRoot()?.setLeft(makeBinaryTreeNode(2))
    expect(tree.getRoot()?.getLeft()?.value).toBe(2)
    expect(tree.getRoot()?.getRight()?.value).toBeUndefined()
    tree.getRoot()?.setRight(makeBinaryTreeNode(3))
    expect(tree.getRoot()?.getRight()?.value).toBe(3)
  })

  it("should increase tree depth accordingly", () => {
    const tree = makeBinaryTree<number>()
    tree.setRoot(makeBinaryTreeNode(1))
    tree.getRoot()?.setLeft(makeBinaryTreeNode(5))
    expect(tree.getDepth()).toBe(2)
    tree
      .getRoot()
      ?.getLeft()
      ?.setLeft(makeBinaryTreeNode(5))
    expect(tree.getDepth()).toBe(3)
  })
})

describe("given a predefined filled tree...", () => {
  let tree = makeBinaryTree<number>()

  beforeEach(() => {
    tree = makeBinaryTree<number>()
    tree.setRoot(makeBinaryTreeNode(4))
    tree.getRoot()?.setLeft(makeBinaryTreeNode(2))
    tree
      .getRoot()
      ?.getLeft()
      ?.setLeft(makeBinaryTreeNode(1))
    tree
      .getRoot()
      ?.getLeft()
      ?.setRight(makeBinaryTreeNode(3))
    tree.getRoot()?.setRight(makeBinaryTreeNode(6))
    tree
      .getRoot()
      ?.getRight()
      ?.setLeft(makeBinaryTreeNode(5))
    tree
      .getRoot()
      ?.getRight()
      ?.setRight(makeBinaryTreeNode(7))
  })

  it("should traverse in-order values correctly", () => {
    const mockFn = jest.fn()
    for (const value of tree.getRoot()!.inOrderVertices()) {
      mockFn(value)
    }
    expect(mockFn.mock.calls).toEqual([[1], [2], [3], [4], [5], [6], [7]])
  })

  it("should traverse pre-order values correctly", () => {
    const mockFn = jest.fn()
    for (const value of tree.getRoot()!.preOrderVertices()) {
      mockFn(value)
    }
    expect(mockFn.mock.calls).toEqual([[4], [2], [1], [3], [6], [5], [7]])
  })

  it("should traverse post-order values correctly", () => {
    const mockFn = jest.fn()
    for (const value of tree.getRoot()!.postOrderVertices()) {
      mockFn(value)
    }
    expect(mockFn.mock.calls).toEqual([[1], [3], [2], [5], [7], [6], [4]])
  })
})

describe("when removing nodes...", () => {
  it("should decrease tree depth accordingly", () => {
    const tree = makeBinaryTree<number>()
    tree.setRoot(makeBinaryTreeNode(1))
    tree.getRoot()?.setLeft(makeBinaryTreeNode(2))
    tree
      .getRoot()
      ?.getLeft()
      ?.setLeft(makeBinaryTreeNode(3))
    tree
      .getRoot()
      ?.getLeft()
      ?.setLeft(null)
    expect(tree.getDepth()).toBe(2)
  })
})
