import express, { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-errors";
import bcrypt from "bcrypt";
import { User } from "../models/user-model";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new RequestValidationError([
          { message: "Invalid email or password" },
        ]);
      }

      let existingUser = await User.findOne({ email });

      if (existingUser) {
        console.log("Email in use!");
        throw new BadRequestError("Email already in use");
      }
      let hashedPassword = await bcrypt.hash(password, 10);
      const user:any = User.build({ email, password: hashedPassword });
      await user.save();
      console.log(process.env.JWT_SECRET)
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: 60 * 15 }
      );

      //store token on session object
      req.session={
        jwt: token
      }
     
      return res.status(200).send(user);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
);

export default router;
