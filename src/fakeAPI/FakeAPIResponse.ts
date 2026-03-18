import type { ErrorMessages } from "./ErrorMessages";

class FakeAPIResponse<T = unknown> {
  private data: T | null = null;
  private error: { message: string; userFriendly: boolean } | null = null;
  public hasError = false;

  public setData(data: T) {
    this.hasError = false;
    this.data = data;
  }

  public setError(message: ErrorMessages, userFriendly: boolean = false) {
    this.hasError = true;
    this.error = { message, userFriendly };
    return false;
  }

  public getResponse(): FAResponse<T> {
    if (this.error) {
      return {
        success: false,
        error: {
          message: this.error.message,
          userFriendly: this.error?.userFriendly,
        },
      };
    }
    return {
      success: true,
      data: this.data,
    };
  }
}

export { FakeAPIResponse };
