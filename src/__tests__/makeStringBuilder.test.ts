import { makeStringBuilder } from "../makeStringBuilder";

describe("makeStringBuilder", () => {
  it("should return empty string when append is not called", () => {
    const sentence = makeStringBuilder();
    expect(sentence.toString()).toBe("");
  });

  it("should append strings", () => {
    const sentence = makeStringBuilder();
    sentence.append("hi");
    sentence.append(" mister");
    expect(sentence.toString()).toBe("hi mister");
  });
});
