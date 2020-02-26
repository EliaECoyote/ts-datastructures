import { makeQueue } from "../makeQueue"
import { NoSuchElementError } from "../errors"

describe("with an empty queue...", () => {
  it("should have no top value", () => {
    const queue = makeQueue()
    expect(queue.peek()).toBeUndefined()
  })

  it("should be empty", () => {
    const queue = makeQueue()
    expect(queue.isEmpty()).toBe(true)
  })

  it("should throw during removal operation", () => {
    const queue = makeQueue()
    expect(queue.remove).toThrowError(NoSuchElementError)
  })
})

describe("when adding single element...", () => {
  it("should be retrievable through peek", () => {
    const queue = makeQueue()
    queue.add(1)
    expect(queue.peek()).toBe(1)
  })

  it("should be empty after element removal", () => {
    const queue = makeQueue()
    queue.add(1)
    queue.remove()
    expect(queue.isEmpty()).toBe(true)
  })
})

describe("when adding multiple values", () => {
  it("should be in FIFO order", () => {
    const queue = makeQueue()
    queue.add(1)
    queue.add(2)
    queue.add(3)
    expect(queue.peek()).toBe(1)
    queue.remove()
    expect(queue.peek()).toBe(2)
    queue.remove()
    expect(queue.peek()).toBe(3)
  })
})

describe("when defined with initial elements...", () => {
  it("should be in FIFO order", () => {
    const queue = makeQueue(1, 2, 3)
    expect(queue.peek()).toBe(1)
    queue.remove()
    expect(queue.peek()).toBe(2)
    queue.remove()
    expect(queue.peek()).toBe(3)
  })
})