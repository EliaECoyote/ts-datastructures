import { makeHashTable } from "../makeHashTable";

const sampleValue = { test: true };

describe("makeHashTable", () => {
  it("should retrieve added items", () => {
    const hashTable = makeHashTable();
    hashTable.add("x", sampleValue);
    expect(hashTable.get("x")).toBe(sampleValue);
  });

  it("should not retrieve not added items", () => {
    const hashTable = makeHashTable();
    expect(hashTable.get("x")).toBe(undefined);
  });

  it("should delete items correctly", () => {
    const hashTable = makeHashTable();
    hashTable.add("x", sampleValue);
    hashTable.remove("x");
    expect(hashTable.get("x")).toBe(undefined);
  });

  it("should have no lenght with no items", () => {
    const hashTable = makeHashTable();
    expect(hashTable.length()).toBe(0);
  });

  it("should increase length when items are added", () => {
    const hashTable = makeHashTable();
    hashTable.add("x", sampleValue);
    expect(hashTable.length()).toBe(1);
  });

  it("should decrease length when items are removed", () => {
    const hashTable = makeHashTable();
    hashTable.add("x", sampleValue);
    hashTable.remove("x");
    expect(hashTable.length()).toBe(0);
  });

  it("should not decrease length when not-existing items are removed", () => {
    const hashTable = makeHashTable();
    hashTable.add("x", sampleValue);
    hashTable.remove("y");
    expect(hashTable.length()).toBe(1);
  });
});
