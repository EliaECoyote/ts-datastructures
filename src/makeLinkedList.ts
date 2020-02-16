import { IndexOutOfBoundsError } from "./errors"

type Node<T> = {
  value: T
  next?: Node<T> | null
}

function getLastNode<T>(head: Node<T>): Node<T> {
  let node = head
  while (node.next != null) {
    node = node.next
  }
  return node
}

function createHead<T>(values: T[]): Node<T> | null {
  let head: Node<T> | null = null
  let prevNode: Node<T> | null = null
  for (const value of values) {
    const node = { value }
    if (prevNode == null) head = node
    else prevNode.next = node
    prevNode = node
  }
  return head
}

export function makeLinkedList<T>(...initialValues: T[]) {
  let head = createHead(initialValues)

  /**
   * Retrieves, without removing, the head (first element) of the list.
   */
  function element() {
    return head?.value
  }

  /**
   * Retrieves the element at the specified position in this list.
   */
  function get(index: number) {
    let node = head
    for (let i = 0; i < index; i += 1) {
      if (node?.next) node = node.next
      else return undefined
    }
    return node?.value
  }

  /**
   * Inserts the specified element at the specified position in this list.
   * @throws {IndexOutOfBoundsError}
   */
  function add(index: number, value: T) {
    if (head == null && index === 0) head = { value }
    else if (head == null) throw new IndexOutOfBoundsError()
    else {
      let prevNode = head
      for (let i = 0; i < index - 1; i += 1) {
        if (prevNode?.next) prevNode = prevNode.next
        else throw new IndexOutOfBoundsError()
      }
      prevNode.next = { value, next: prevNode.next }
    }
  }

  /**
   * Appends the specified element to the end of this list.
   */
  function append(value: T) {
    if (head == null) head = { value }
    else getLastNode(head).next = { value }
  }

  /**
   * Prepends the specified element to the beginning of this list.
   */
  function prepend(value: T) {
    head = { value, next: head }
  }

  /**
   * Removes the element at the specified position in this list.
   * @throws {IndexOutOfBoundsError}
   */
  function remove(index: number) {
    if (head == null) throw new IndexOutOfBoundsError()
    else if (index === 0) head = head.next ?? null
    else {
      let prevNode = head
      for (let i = 0; i < index - 1; i += 1) {
        if (prevNode?.next != null) prevNode = prevNode.next
        else throw new IndexOutOfBoundsError()
      }
      if (prevNode.next) prevNode.next = prevNode.next?.next
    }
  }

  /**
   * Retrieves an Iterable to iterate over all the list values.
   * Syntax:
   * ```
   * for (const value of linkedList.values()) {
   *   ...
   * }
   * ```
   */
  function* values() {
    let node = head
    while (node?.next != null) {
      yield node.value
      node = node.next
    }
    if (node) yield node.value
  }

  return {
    element,
    get,
    add,
    append,
    prepend,
    remove,
    values,
  }
}
