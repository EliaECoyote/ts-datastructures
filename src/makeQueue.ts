import { makeLinkedList } from "./makeLinkedList"
import { NoSuchElementError } from "./utils/errors"

export function makeQueue<T>(...initialValues: T[]) {
  const linkedList = makeLinkedList<T>(...initialValues)

  /**
   * Retrieves the top of the queue
   */
  function peek() {
    return linkedList.get(0)
  }

  /**
   * Enqueues item to the end of the queue
   */
  function enqueue(value: T) {
    linkedList.append(value)
  }

  /**
   * Removes the first item in the queue
   * @throws {NoSuchElementError}
   */
  function dequeue() {
    if (linkedList.isEmpty()) throw new NoSuchElementError()
    const item = peek()
    linkedList.remove(0)
    return item
  }

  /**
   * Return true if and only if the queue is empty
   */
  function isEmpty() {
    return Boolean(linkedList.get(0) === undefined)
  }

  return {
    peek,
    enqueue,
    dequeue,
    isEmpty,
  }
}
