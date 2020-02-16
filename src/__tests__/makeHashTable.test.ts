import { makeHashTable } from "../makeHashTable"

describe("when invoking the set fn...", () => {
  it("should retrieve correctly the value", () => {
    const hashTable = makeHashTable()
    hashTable.set("x", "y")
    expect(hashTable.get("x")).toBe("y")
  })

  it("should not retrieve unavailable values", () => {
    const hashTable = makeHashTable()
    expect(hashTable.get("x")).toBeUndefined()
  })

  it("should overwrite existing values", () => {
    const hashTable = makeHashTable()
    hashTable.set("x", "y")
    hashTable.set("x", "z")
    expect(hashTable.get("x")).toBe("z")
  })
})

describe("when invoking the remove fn...", () => {
  it("should remove key-values correctly", () => {
    const hashTable = makeHashTable()
    hashTable.set("x", "y")
    hashTable.remove("x")
    expect(hashTable.get("x")).toBeUndefined()
  })

  it("should not crash when key is not available", () => {
    const hashTable = makeHashTable()
    expect(hashTable.remove("x")).toBeUndefined()
  })
})

describe("when invoking the length fn...", () => {
  it("should return no lenght with no items", () => {
    const hashTable = makeHashTable()
    expect(hashTable.length()).toBe(0)
  })

  it("should increase length when items are added", () => {
    const hashTable = makeHashTable()
    hashTable.set("x", "y")
    expect(hashTable.length()).toBe(1)
  })

  it("should decrease length when items are removed", () => {
    const hashTable = makeHashTable()
    hashTable.set("x", "y")
    hashTable.remove("x")
    expect(hashTable.length()).toBe(0)
  })

  it("should not decrease length when not-existing items are removed", () => {
    const hashTable = makeHashTable()
    hashTable.set("x", "y")
    hashTable.remove("y")
    expect(hashTable.length()).toBe(1)
  })
})
