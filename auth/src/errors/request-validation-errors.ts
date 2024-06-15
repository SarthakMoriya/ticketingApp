// interface CustomError{
//   statusCode: number;
//   serializeErrors():{
//     message: string;
//   }[]
// }

import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError{
  public errors: any[];
  public statusCode: number=500;
  constructor(errors: any[]) {
    super();
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.message };
    });
  }
}
