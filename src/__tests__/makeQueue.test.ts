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
    expect(queue.dequeue).toThrowError(NoSuchElementError)
  })
})

describe("when adding single element...", () => {
  it("should be retrievable through peek", () => {
    const queue = makeQueue()
    queue.enqueue(1)
    expect(queue.peek()).toBe(1)
  })

  it("should be empty after element removal", () => {
    const queue = makeQueue()
    queue.enqueue(1)
    queue.dequeue()
    expect(queue.isEmpty()).toBe(true)
  })
})

describe("when adding multiple values", () => {
  it("should be in FIFO order", () => {
    const queue = makeQueue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.peek()).toBe(3)
  })
})

describe("when defined with initial elements...", () => {
  it("should be in FIFO order", () => {
    const queue = makeQueue(1, 2, 3)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.peek()).toBe(3)
  })
})
