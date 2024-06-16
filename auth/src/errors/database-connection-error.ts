import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{
  public errors: any[];
  public statusCode: number = 500;
  public reason: string = "Database connection error!";
  constructor(errors: any[]) {
    super('Error connecting to DB');
    this.errors = errors;
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(){
    return [{message:this.reason}]
  }
}
