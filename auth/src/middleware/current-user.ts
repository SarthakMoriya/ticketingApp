import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";



export const currentUser=(req: any, res: Response,next:NextFunction) => {
  if (!req.session || !req.session.jwt) {
    return next()
  }
  const token = req.session.jwt;
  try {
    const details: any = jwt.verify(token, process.env.JWT_SECRET!) 
    req.currentUser = details
    next();
  } catch (error) {
    return res.status(500).json({ currentUser: null });
  }
};

export default currentUser;