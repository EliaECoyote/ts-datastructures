import { makeStack } from "../makeStack"
import { EmptyStackError } from "../utils/errors"

describe("with an empty stack...", () => {
  it("should have no top value", () => {
    const stack = makeStack()
    expect(stack.peek()).toBeUndefined()
  })

  it("should be empty", () => {
    const stack = makeStack()
    expect(stack.isEmpty()).toBe(true)
  })

  it("should throw during pop operation", () => {
    const stack = makeStack()
    expect(stack.pop).toThrowError(EmptyStackError)
  })
})

describe("when adding single element...", () => {
  it("should be retrievable through peek", () => {
    const stack = makeStack()
    stack.push(1)
    expect(stack.peek()).toBe(1)
  })

  it("should be empty after element removal", () => {
    const stack = makeStack()
    stack.push(1)
    expect(stack.pop()).toBe(1)
    expect(stack.isEmpty()).toBe(true)
  })
})

describe("when adding multiple values", () => {
  it("should be in LIFO order", () => {
    const stack = makeStack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
  })
})

describe("when defined with initial elements...", () => {
  it("should be in LIFO order", () => {
    const stack = makeStack(1, 2, 3)
    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
  })
})
