import { LinkedList, makeLinkedList } from "./makeLinkedList"

type Key = string | number | symbol

type DataItem<T> = [Key, T]

type HashTable<T> = {
  set: (key: Key, value: T) => void
  get: (key: Key) => T | undefined
  remove: (key: Key) => void
  length: () => number
}

export function makeHashTable<T>(): HashTable<T> {
  let _length = 0
  const data: LinkedList<DataItem<T>>[] = []

  function createHash(key: Key) {
    return reallyBadHashingFunction(key)
  }

  function getIndexFromHash(hash: number) {
    return reallyBadHashToIndexFunction(hash)
  }

  /**
   * Replaces the element in the specified index with `value`
   */
  function set(key: Key, value: T) {
    const hash = createHash(key)
    const index = getIndexFromHash(hash)
    if (data[index] == null) data[index] = makeLinkedList([key, value])
    else {
      const node = data[index].find(item => item[0] === key)
      if (node) node.value[1] = value
      else data[index].prepend([key, value])
    }
    _length += 1
  }

  /**
   * Retrieves the element with the specified `key`
   */
  function get(key: Key) {
    const hash = createHash(key)
    const index = getIndexFromHash(hash)
    if (data[index]) return data[index].find(item => item[0] === key)?.value[1]
  }

  /**
   * Removes the element with the specified `key`
   */
  function remove(key: Key) {
    const hash = createHash(key)
    const index = getIndexFromHash(hash)
    if (data[index]) {
      const itemIndex = data[index].findIndex(item => item[0] === key)
      if (itemIndex !== -1) {
        data[index].remove(itemIndex)
        _length -= 1
      }
    }
  }

  function length() {
    return _length
  }

  // TODO: Add key / values iterable generators!

  return {
    set,
    get,
    remove,
    length,
  }
}

//
// ⚠️ Warning! ⚠️
// For simplicity reasons, the following fns are really badly implemented.
// They represents just a sample - if implemented better, they would greatly
// improve the hashtable performances.
// A great hashing function, for example, would improve the `get` fn time
// complexity to an O(1) (on average)
//

function reallyBadHashingFunction(key: Key) {
  return typeof key === "string"
    ? key.charCodeAt(0)
    : Number(key)
        .toString()
        .charCodeAt(0)
}

function reallyBadHashToIndexFunction(keyHash: number) {
  return parseInt(keyHash.toString()[1])
}
