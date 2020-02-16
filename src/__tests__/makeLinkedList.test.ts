import { makeLinkedList } from "../makeLinkedList"
import { IndexOutOfBoundsError } from "../errors"

describe("makeLinkedList", () => {
  describe("when invoking the make fn...", () => {
    it("should contain the initial specified values", () => {
      const linkedList = makeLinkedList("0", "1")
      const fn = jest.fn()
      for (const value of linkedList.values()) {
        fn(value)
      }
      expect(fn).toBeCalledTimes(2)
      expect(fn).toBeCalledWith("0")
      expect(fn).toBeCalledWith("1")
    })

    it("should be empty with no specified values", () => {
      const linkedList = makeLinkedList()
      const fn = jest.fn()
      for (const value of linkedList.values()) {
        fn(value)
      }
      expect(fn).toBeCalledTimes(0)
    })
  })

  describe("when invoking the element fn...", () => {
    it("should retrieve the first item", () => {
      const linkedList = makeLinkedList("0", "1")
      expect(linkedList.element()).toBe("0")
    })

    it("should retrieve null when the head is not specified", () => {
      const linkedList = makeLinkedList()
      expect(linkedList.element()).toBeUndefined()
    })
  })

  describe("when invoking the get fn...", () => {
    it("should retrieve the item at the specified index", () => {
      const linkedList = makeLinkedList("0", "1", "2")
      expect(linkedList.get(1)).toBe("1")
    })

    it("should retrieve undefined when item is not available", () => {
      const linkedList = makeLinkedList("0")
      expect(linkedList.get(1)).toBeUndefined()
    })
  })

  describe("when invoking the add fn...", () => {
    it("should add the item and mantain the previous ones", () => {
      const linkedList = makeLinkedList("0", "2")
      linkedList.add(1, "1")
      expect(linkedList.get(0)).toBe("0")
      expect(linkedList.get(1)).toBe("1")
      expect(linkedList.get(2)).toBe("2")
    })

    it("should correctly add the item at index = list.length", () => {
      const linkedList = makeLinkedList("0", "1")
      linkedList.add(2, "2")
      expect(linkedList.get(2)).toBe("2")
    })

    it("should replace head with index 0", () => {
      const linkedList = makeLinkedList()
      linkedList.add(0, "0")
      expect(linkedList.get(0)).toBe("0")
    })

    it("should throw when the specified index is > list.length", () => {
      const linkedList = makeLinkedList("0", "1", "2")
      expect(() => linkedList.add(4, "4")).toThrowError(IndexOutOfBoundsError)
    })
  })

  describe("when invoking the append fn...", () => {
    it("should replace head with no other items", () => {
      const linkedList = makeLinkedList()
      linkedList.append("0")
      expect(linkedList.get(0)).toBe("0")
    })

    it("should append to the end of the list", () => {
      const linkedList = makeLinkedList("0")
      linkedList.append("1")
      expect(linkedList.get(1)).toBe("1")
    })
  })

  describe("when invoking the prepend fn...", () => {
    it("should replace head with no other items", () => {
      const linkedList = makeLinkedList()
      linkedList.prepend("0")
      expect(linkedList.get(0)).toBe("0")
    })

    it("should prepend to the beginning of the list", () => {
      const linkedList = makeLinkedList("1")
      linkedList.prepend("0")
      expect(linkedList.get(0)).toBe("0")
      expect(linkedList.get(1)).toBe("1")
    })
  })

  describe("when invoking the remove fn...", () => {
    it("should remove the element when available", () => {
      const linkedList = makeLinkedList("0", "x", "1")
      linkedList.remove(1)
      expect(linkedList.get(0)).toBe("0")
      expect(linkedList.get(1)).toBe("1")
    })

    it("should remove the head when no other item is available", () => {
      const linkedList = makeLinkedList("x")
      linkedList.remove(0)
      expect(linkedList.get(0)).toBeUndefined()
    })

    it("should remove the tail", () => {
      const linkedList = makeLinkedList("0", "1", "x")
      linkedList.remove(2)
      expect(linkedList.get(2)).toBeUndefined()
    })

    it("should throw when item at index is not available", () => {
      const linkedList = makeLinkedList("0", "1", "2")
      expect(() => linkedList.remove(4)).toThrowError(IndexOutOfBoundsError)
    })

    it("should throw with head undefined", () => {
      const linkedList = makeLinkedList()
      expect(() => linkedList.remove(0)).toThrowError(IndexOutOfBoundsError)
    })
  })
})
