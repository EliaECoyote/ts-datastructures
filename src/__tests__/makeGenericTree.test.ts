import { makeGenericTree, makeTreeNode, TreeNode } from "../makeGenericTree"

describe("with an empty tree...", () => {
  it("should have no root", () => {
    const tree = makeGenericTree()
    expect(tree.getRoot()).toBe(null)
  })

  it("should have 0 depth", () => {
    const tree = makeGenericTree()
    expect(tree.getDepth()).toBe(0)
  })
})

describe("with a defined root...", () => {
  it("should have depth 1", () => {
    const tree = makeGenericTree<number>()
    tree.setRoot(makeTreeNode(1))
    expect(tree.getDepth()).toBe(1)
  })

  it("should add nodes correctly", () => {
    const tree = makeGenericTree<number>()
    tree.setRoot(makeTreeNode(1))
    const root = tree.getRoot()
    if (root == null) fail()
    const child = makeTreeNode(2)
    root.addChild(child)
    const mock = jest.fn()
    for (const node of root.children()) {
      mock(node)
    }
    expect(mock).toBeCalledTimes(1)
    expect(mock).toBeCalledWith(child)
  })

  it("should have correct depth", () => {
    const tree = makeGenericTree<number>()
    tree.setRoot(makeTreeNode(1))
    const child = makeTreeNode(2)
    tree.getRoot()?.addChild(child)
    expect(tree.getDepth()).toBe(2)
    child.addChild(makeTreeNode(3))
    expect(tree.getDepth()).toBe(3)
    child.addChild(makeTreeNode(4), makeTreeNode(5))
    expect(tree.getDepth()).toBe(3)
  })

  it("should add child nodes to child nodes correctly", () => {
    const tree = makeGenericTree<number>()
    tree.setRoot(makeTreeNode(1))
    const root = tree.getRoot()
    if (root == null) fail()
    const child = makeTreeNode(2)
    root.addChild(child)
    child.addChild(makeTreeNode(3), makeTreeNode(4))
    const mockFn = jest.fn()
    let firstRootChild: TreeNode<number> | null = null
    for (const node of root.children()) {
      firstRootChild = node
    }
    if (firstRootChild == null) fail()
    for (const node of firstRootChild.children()) {
      mockFn(node.value)
    }
    expect(mockFn.mock.calls).toEqual([[3], [4]])
  })
})
