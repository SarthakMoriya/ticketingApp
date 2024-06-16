import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  public statusCode: number = 500;
  constructor(public errors: any[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.message };
    });
  }
}
