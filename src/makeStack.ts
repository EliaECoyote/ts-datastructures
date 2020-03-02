import { makeLinkedList } from "./makeLinkedList"
import { EmptyStackError } from "./errors"

export type Stack<T> = {
  peek: () => T | undefined
  push: (item: T) => void
  pop: () => T
  isEmpty: () => boolean
}

export function makeStack<T>(...initialValues: T[]): Stack<T> {
  const linkedList = makeLinkedList<T>()
  initialValues.forEach(linkedList.prepend)

  /**
   * Retrieves the top of the stack
   */
  function peek() {
    return linkedList.get(0)
  }

  /**
   * Adds item to the top of the stack
   */
  function push(item: T) {
    linkedList.prepend(item)
  }

  /**
   * Removes and retrieves the top item from the stack
   * @throws {EmptyStackError}
   */
  function pop() {
    const item = linkedList.get(0)
    if (item) {
      linkedList.remove(0)
      return item
    }
    throw new EmptyStackError()
  }

  /**
   * Return true if and only if the stack is empty
   */
  function isEmpty() {
    return Boolean(linkedList.get(0) === undefined)
  }

  return {
    peek,
    push,
    pop,
    isEmpty,
  }
}
