export class IndexOutOfBoundsError extends Error {
  constructor() {
    super("Index out of bounds")
    this.name = "IndexOutOfBoundsError"
  }
}

export class NoSuchElementError extends Error {
  constructor() {
    super("No such element")
    this.name = "NoSuchElementError"
  }
}

export class EmptyStackError extends Error {
  constructor() {
    super("Empty stack")
    this.name = "EmptyStackError"
  }
}
