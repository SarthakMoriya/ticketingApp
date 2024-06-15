import express ,{Request,Response}from 'express'
import cors from 'cors'
import currentUserRouter from "./routes/current-user"
import signinUserRouter from "./routes/signin"
import signoutUserRouter from "./routes/signout"
import signupUserRouter from "./routes/signup"
import { errorHandler } from './middleware/error-handler'
import { NotFoundError } from './errors/not-found-error'


const app=express();
app.use(cors());
app.use(express.json());

app.use(signupUserRouter)
app.use(currentUserRouter)
app.use(signinUserRouter)
app.use(signoutUserRouter)

//at end if none of the routes matches
app.get("*",()=>{
    throw new NotFoundError()
})

//at end so any error occurs above is handled here 
app.use(errorHandler);

app.listen(3000,()=>{
    console.log("V1")
    console.log("Service listening on port 3000")
})