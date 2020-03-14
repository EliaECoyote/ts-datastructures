import {
  makeBinarySearchTree,
  makeBinarySearchTreeNode,
} from "../makeBinarySearchTree"

describe("with an empty tree...", () => {
  it("should return null on search", () => {
    const tree = makeBinarySearchTree()
    expect(tree.search(1)).toBe(null)
    expect(tree.search(null)).toBe(null)
  })
})

describe("given a predefined filled tree...", () => {
  let tree = makeBinarySearchTree<number>()

  beforeEach(() => {
    /*
            40
         /      \
        20      60
       /  \    /  \
      10  30  50  70
    */
    tree = makeBinarySearchTree<number>()
    tree.setRoot(makeBinarySearchTreeNode(40))
    tree.getRoot()?.setLeft(makeBinarySearchTreeNode(20))
    tree
      .getRoot()
      ?.getLeft()
      ?.setLeft(makeBinarySearchTreeNode(10))
    tree
      .getRoot()
      ?.getLeft()
      ?.setRight(makeBinarySearchTreeNode(30))
    tree.getRoot()?.setRight(makeBinarySearchTreeNode(60))
    tree
      .getRoot()
      ?.getRight()
      ?.setLeft(makeBinarySearchTreeNode(50))
    tree
      .getRoot()
      ?.getRight()
      ?.setRight(makeBinarySearchTreeNode(70))
  })

  it("should insert lowest value as the leftmost leaft", () => {
    tree.insert(5)
    expect(
      tree
        .getRoot()
        ?.getLeft()
        ?.getLeft()
        ?.getLeft()?.value,
    ).toBe(5)
  })

  it("should insert highest value as the rightmost leaf", () => {
    tree.insert(75)
    expect(
      tree
        .getRoot()
        ?.getRight()
        ?.getRight()
        ?.getRight()?.value,
    ).toBe(75)
  })

  it("should insert in-between values as the rightmost leaft", () => {
    tree.insert(45)
    tree.insert(25)
    expect(
      tree
        .getRoot()
        ?.getRight()
        ?.getLeft()
        ?.getLeft()?.value,
    ).toBe(45)
    expect(
      tree
        .getRoot()
        ?.getLeft()
        ?.getRight()
        ?.getLeft()?.value,
    ).toBe(25)
  })

  it("should ignore insertion of already-existing values", () => {
    expect(tree.getDepth()).toBe(3)
    tree.insert(40)
    expect(tree.getDepth()).toBe(3)
  })
})
