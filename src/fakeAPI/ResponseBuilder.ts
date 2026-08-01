import { Errors, type ErrorID, type ResponseError } from "./Errors";

export type Response<T = unknown> =
  | {
      success: true;
      data: T | null;
    }
  | {
      success: false;
      error: ResponseError;
    };

class ResponseBuilder<T = unknown> {
  private data: T | null = null;
  private errorId: ErrorID | null = null;

  public setData(data: T) {
    this.data = data;
    return this;
  }

  public setError(id: ErrorID) {
    this.errorId = id;
    return this;
  }

  public build(): Response<T> {
    if (this.errorId) {
      return {
        success: false,
        error: Errors.get(this.errorId),
      };
    }
    return {
      success: true,
      data: this.data,
    };
  }
}

export { ResponseBuilder };
