import express from "express";

// for taking values from .env file
import { config } from "dotenv";

// to create a middleware to connect frontend and backend
import cors from "cors";

// for cookies
import cookieParser from "cookie-parser";

// for file upload
import fileUpload from "express-fileupload";

import { dbConnection } from "./database/dbConnection.js";

// for routing of data (use before db connection )
import messageRouter from "./router/messageRouter.js";

import { errorMiddleware } from "./middleware/errorMiddleware.js";

import userRouter from "./router/userRouter.js";

import appointmentRouter from "./router/appointmentRouter.js";

// starting express server
const app = express();

// path to env file
config({ path: "./config/config.env" });

// using cors for middleware
app.use(
  cors({
    // origin takes url that are allowed access to our apis
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    // put methods here that we will use in our application
    method: ["GET", "POST", "PUT", "DELETE"],
    // if u want cookies then set to true else set false
    credentials: true,
  })
);

// to get cookies
app.use(cookieParser());

// parses our json data to string
app.use(express.json());

// for parsing form data
app.use(express.urlencoded({ extended: true }));

// for file upload
app.use(
  fileUpload({
    // use this to store large files temporarily on system
    useTempFiles: true,

    // path of where to store it on system
    tempFileDir: "/tmp/",
  })
);

// app.use for middleware
// any url that starts with /api/v1/messageRouter, the messageRouter will handle it
app.use("/api/v1/message", messageRouter);

app.use("/api/v1/user", userRouter);

app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

// always use error middleware at the end
app.use(errorMiddleware);
export default app;
