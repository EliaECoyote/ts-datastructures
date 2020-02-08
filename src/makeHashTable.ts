function someHashingFunction(key: number | string) {
  return typeof key === "string"
    ? key.charCodeAt(0)
    : Number(key)
        .toString()
        .charCodeAt(0);
}

function someHashToIndexFn(keyHash: number) {
  return keyHash.toString()[1];
}

type DataItem<T> = [string | number, T];

export function makeHashTable<T>() {
  let _length = 0;
  const data: DataItem<T>[][] = [];

  function createHash(key: number | string) {
    return someHashingFunction(key);
  }

  function getIndexFromHash(hash: number) {
    return someHashToIndexFn(hash);
  }

  // O(1) time complexity (average)
  function add(key: string | number, value: T) {
    const hash = createHash(key);
    const index = getIndexFromHash(hash);
    if (data[index] != null) data[index] = data[index].concat([[key, value]]);
    else data[index] = [[key, value]];
    _length += 1;
  }

  // O(1) time complexity (average)
  function get(key: string | number) {
    const hash = createHash(key);
    const index = getIndexFromHash(hash);
    if (data[index]) {
      const [, value] = data[index].find(([dataKey]) => dataKey === key) ?? [];
      return value;
    }
    return undefined;
  }

  // O(1) time complexity (average)
  function remove(key: string | number) {
    const hash = createHash(key);
    const index = getIndexFromHash(hash);
    if (data[index]) {
      const itemIndex = data[index].findIndex(([itemKey]) => itemKey === key);
      if (itemIndex != null) {
        data[index] = data[index]
          .slice(0, itemIndex)
          .concat(data[index].slice(itemIndex + 1));
        _length -= 1;
      }
    }
  }

  function length() {
    return _length;
  }

  return {
    add,
    get,
    remove,
    length
  };
}
