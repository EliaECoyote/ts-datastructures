import { makeBinarySearchTree, BinarySearchTree } from "../makeBinarySearchTree"

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
  it("shoud retrieve ascending items when traversing in-order", () => {
    const tree = makePredefinedTree()
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
    const tree = makePredefinedTree()
    expect(tree.getDepth()).toBe(3)
  })

  describe("insertion tests...", () => {
    it("should insert lowest value as the leftmost leaf", () => {
      const tree = makePredefinedTree()
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
      const tree = makePredefinedTree()
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
      const tree = makePredefinedTree()
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
      const tree = makePredefinedTree()
      expect(tree.getDepth()).toBe(3)
      tree.insert(40)
      expect(tree.getDepth()).toBe(3)
    })
  })

  describe("removal tests...", () => {
    it("should remove leaf correctly", () => {
      const tree = makePredefinedTree()
      tree.remove(30)
      const mockFn = jest.fn()
      for (const key of tree.getRoot()!.inOrderVertices()) {
        mockFn(key)
      }
      expect(mockFn.mock.calls).toEqual([[10], [20], [40], [50], [60], [70]])
    })

    it("should remove node with single branch correctly", () => {
      const tree = makePredefinedTree()
      tree.insert(55)
      tree.remove(50)
      const mockFn = jest.fn()
      for (const key of tree.getRoot()!.inOrderVertices()) {
        mockFn(key)
      }
      expect(mockFn.mock.calls).toEqual([
        [10],
        [20],
        [30],
        [40],
        [55],
        [60],
        [70],
      ])
    })

    it("should remove node with both branches correctly", () => {
      const tree = makePredefinedTree()
      tree.remove(60)
      const mockFn = jest.fn()
      for (const key of tree.getRoot()!.inOrderVertices()) {
        mockFn(key)
      }
      expect(mockFn.mock.calls).toEqual([[10], [20], [30], [40], [50], [70]])
    })

    it("should remove node with both branches (depth > 1) correctly", () => {
      const tree = makePredefinedTree()
      tree.insert(55)
      tree.insert(45)
      tree.insert(65)
      tree.insert(75)
      tree.remove(60)
      const mockFn = jest.fn()
      for (const key of tree.getRoot()!.inOrderVertices()) {
        mockFn(key)
      }
      expect(mockFn.mock.calls).toEqual([
        [10],
        [20],
        [30],
        [40],
        [45],
        [50],
        [55],
        [65],
        [70],
        [75],
      ])
    })
  })
})

function makePredefinedTree() {
  /*
            40
         /      \
        20      60
       /  \    /  \
      10  30  50  70
    */
  const tree = makeBinarySearchTree<number>()
  tree.insert(40)
  tree.insert(20)
  tree.insert(60)
  tree.insert(10)
  tree.insert(30)
  tree.insert(50)
  tree.insert(70)
  return tree
}
