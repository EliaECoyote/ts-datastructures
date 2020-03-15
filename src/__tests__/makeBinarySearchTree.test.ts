import { makeBinarySearchTree } from "../makeBinarySearchTree"

describe("with an empty tree...", () => {
  it("should return null on search", () => {
    const tree = makeBinarySearchTree<number>()
    expect(tree.search(1)).toBe(null)
  })

  it("should insert value in root node", () => {
    const tree = makeBinarySearchTree<number>()
    tree.insert(1)
    expect(tree.getRoot()?.value).toBe(1)
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
    tree.insert(40)
    tree.insert(20)
    tree.insert(60)
    tree.insert(10)
    tree.insert(30)
    tree.insert(50)
    tree.insert(70)
  })

  it("shoud retrieve ascending items when traversing in-order", () => {
    const mockFn = jest.fn()
    for (const key of tree.getRoot()!.inOrderVertices()) {
      mockFn(key)
    }
    expect(mockFn.mock.calls).toEqual([
      [10],
      [20],
      [30],
      [40],
      [50],
      [60],
      [70],
    ])
  })

  it("should have correct depth", () => {
    expect(tree.getDepth()).toBe(3)
  })

  it("should insert lowest value as the leftmost leaf", () => {
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

  it("should insert in-between values as the rightmost leaf", () => {
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
