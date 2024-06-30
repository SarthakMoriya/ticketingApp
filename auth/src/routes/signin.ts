import express, { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-errors";
import { User } from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new RequestValidationError([
          { message: "Invalid email or password" },
        ]);
      }

      let existingUser = await User.findOne({ email });

      if (!existingUser) {
        console.log("Not Account found with email");
        throw new BadRequestError("No account with provided email");
      }
      let compare = await bcrypt.compare(password, existingUser.password);
      console.log(compare)

      if(!compare){
        console.log("Invalid passsword");
        throw new BadRequestError("Invalid passsword");
      }

      const token = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET!,
        { expiresIn: 60 * 15 }
      );

      //store token on session object
      req.session={
        jwt: token
      }
     
      return res.status(200).send(existingUser);
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
