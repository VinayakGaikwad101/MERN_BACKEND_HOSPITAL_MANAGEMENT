// importing the data model from where we made it using its Schema
import { Message } from "../models/messageSchema.js";

import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

import ErrorHandler from "../middleware/errorMiddleware.js";

// async so it executes without pausing the main thread
// next = used to pass control to next middleware

// we wrap entire func inside catchAsyncErrors so it handles error (which we got from postman, ie for requests/ responses )
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  // if body is {
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "johndoe@example.com",
  //     phone: "1234567890",
  //     message: "Hello world!",
  //   }

  // then req.body gives us:
  // const firstName = "John";
  // const lastName = "Doe";
  // const email = "johndoe@example.com";
  // const phone = "1234567890";
  // const message = "Hello world!";
  const { firstName, lastName, email, phone, message } = req.body;

  //   if any field is empty then throw 400, "Bad Request" response
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill full form", 400));
  }

  // ok so entire async will execute simultaneously till it encounters await, then it pauses, executes await block along with main thread, then continues its rest of the async block. in this process, main thread is never stopped.

  await Message.create({ firstName, lastName, email, phone, message });
  //   above line creates an object with given keys in Message collection in mongodb, its values are get from the user before

  // sending response of 200 after success (OK response)
  res.status(200).json({
    success: true,
    message: "Message sent successfully",
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
