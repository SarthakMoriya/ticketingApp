import express, { Request, Response } from "express";
import cors from "cors";
import currentUserRouter from "./routes/current-user";
import signinUserRouter from "./routes/signin";
import signoutUserRouter from "./routes/signout";
import signupUserRouter from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.use(cors());
app.set('trust proxy',true); //to make sure that ingress is used properly telling our app 
app.use(express.json());
app.use(cookieSession({
  signed:false, // donot encrypt as jwt is already encrypted
  secure:true // only https
}))

app.use(signupUserRouter);
app.use(currentUserRouter);
app.use(signinUserRouter);
app.use(signoutUserRouter);

//at end if none of the routes matches
app.all("*", () => {
  throw new NotFoundError();
});

//at end so any error occurs above is handled here
app.use(errorHandler);

const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
      console.log("DB connection established");
    } catch (error) {
      console.error("DB connection failed:", error);
    }
  };
  
app.listen(3000, () => {
  console.log("V1");
  connectDB();
  console.log("Service listening on port 3000");
});
