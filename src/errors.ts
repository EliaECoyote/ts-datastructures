export class IndexOutOfBoundsError extends Error {
  constructor() {
    super("Index out of bounds")
    this.name = "IndexOutOfBoundsError"
  }
}
