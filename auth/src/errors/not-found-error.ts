import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  constructor() {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  statusCode: number = 400;
  serializeErrors(): { message: string }[] {
    return [{ message: "Not Route Found" }];
  }
}
