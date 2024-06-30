import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError{
    public statusCode: number=401;
    serializeErrors(): { message: string; }[] {
        return [{ message:"Not Authorized",}]
    }

    constructor(){
        super();
        Object.setPrototypeOf(this, CustomError.prototype); 
    }
}