export function makeStringBuilder() {
  let stringList: string[] = [];

  function append(value: string) {
    stringList = stringList.concat(value);
  }

  function toString() {
    return stringList.join("");
  }

  return {
    append,
    toString
  };
}
