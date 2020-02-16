type DataItem<T> = [string | number, T]

export function makeHashTable<T>() {
  let _length = 0
  // TODO: use a linkedlist to store key-value pairs at specific index
  const data: DataItem<T>[][] = []

  function createHash(key: number | string) {
    return reallyBadHashingFunction(key)
  }

  function getIndexFromHash(hash: number) {
    return reallyBadHashToIndexFunction(hash)
  }

  /**
   * Replaces the element in the specified index with `value`
   */
  function set(key: string | number, value: T) {
    const hash = createHash(key)
    const index = getIndexFromHash(hash)
    if (data[index] == null) data[index] = [[key, value]]
    else {
      const node = data[index].find(([nodeKey]) => nodeKey === key)
      if (node) node[1] = value
      else data[index] = data[index].concat([[key, value]])
    }
    _length += 1
  }

  /**
   * Retrieves the element with the specified `key`
   */
  function get(key: string | number) {
    const hash = createHash(key)
    const index = getIndexFromHash(hash)
    if (data[index]) {
      const [, value] = data[index].find(([dataKey]) => dataKey === key) ?? []
      return value
    }
    return undefined
  }

  /**
   * Removes the element with the specified `key`
   */
  function remove(key: string | number) {
    const hash = createHash(key)
    const index = getIndexFromHash(hash)
    if (data[index]) {
      const itemIndex = data[index].findIndex(([itemKey]) => itemKey === key)
      if (itemIndex !== -1) {
        data[index] = data[index]
          .slice(0, itemIndex)
          .concat(data[index].slice(itemIndex + 1))
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

function reallyBadHashingFunction(key: number | string) {
  return typeof key === "string"
    ? key.charCodeAt(0)
    : Number(key)
        .toString()
        .charCodeAt(0)
}

function reallyBadHashToIndexFunction(keyHash: number) {
  return parseInt(keyHash.toString()[1])
}
