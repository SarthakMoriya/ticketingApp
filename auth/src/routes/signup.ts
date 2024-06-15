import express, { Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-errors";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post("/api/users/signup", (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new RequestValidationError([
      { message: "Invalid email or password" },
    ]);
  }
  console.log("Creating a user...");
  throw new DatabaseConnectionError([{ message: "Error connecting DB..." }]);
  return res.send({});

  res.send("SIGNUP");
});

export default router;
