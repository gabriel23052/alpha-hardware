import { getFakeAPIError, type ErrorID } from "./errors";

class FakeAPIResponse<T = unknown> {
  private data: T | null = null;
  private error: FAResponseError | null = null;
  public hasError = false;

  public setData(data: T) {
    this.hasError = false;
    this.data = data;
  }

  public setError(id: ErrorID) {
    this.hasError = true;
    this.error = getFakeAPIError(id);
    return false;
  }

  public getResponse(): FAResponse<T> {
    if (this.error) {
      return {
        success: false,
        error: this.error,
      };
    }
    return {
      success: true,
      data: this.data,
    };
  }
}

export { FakeAPIResponse };

