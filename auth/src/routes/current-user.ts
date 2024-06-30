import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import currentUser from "../middleware/current-user";
import requireAuth from "../middleware/require-auth";
const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  (req: any, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export default router;
