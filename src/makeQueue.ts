import { makeLinkedList } from "./makeLinkedList"
import { NoSuchElementError } from "./errors"

export function makeQueue<T>(...initialValues: T[]) {
  const linkedList = makeLinkedList<T>(...initialValues)

  /**
   * Retrieves the top of the queue
   */
  function peek() {
    return linkedList.get(0)
  }

  /**
   * Adds item to the end of the queue
   */
  function add(value: T) {
    linkedList.append(value)
  }

  /**
   * Removes the first item in the queue
   * @throws {NoSuchElementError}
   */
  function remove() {
    try {
      linkedList.remove(0)
    } catch (_error) {
      throw new NoSuchElementError()
    }
  }

  /**
   * Return true if and only if the queue is empty
   */
  function isEmpty() {
    return Boolean(linkedList.get(0) === undefined)
  }

  return {
    peek,
    add,
    remove,
    isEmpty,
  }
}
