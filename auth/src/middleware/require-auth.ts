import { NextFunction, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth=(req:any,res:Response,next:NextFunction)=>{
    if(!req.currentUser){
        throw new NotAuthorizedError()
    }

    next();
}

export default requireAuth;