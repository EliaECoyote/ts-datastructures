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
