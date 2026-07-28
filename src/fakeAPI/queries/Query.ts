abstract class Query<T extends object> {
  protected buffer: T[] = [];
  protected externalSelect = true;

  protected setBuffer(value: T | T[] | null | undefined) {
    this.externalSelect = false;
    if (value === undefined || value === null) {
      this.buffer = [];
      return;
    }
    if (Array.isArray(value)) {
      this.buffer = value;
      return;
    }
    this.buffer = [value];
  }

  public clear() {
    this.externalSelect = true;
    this.buffer = [];
    return this;
  }

  public isEmpty() {
    return this.buffer.length === 0;
  }
}

export { Query };
