import mongoose, { model } from "mongoose";

// for data validation
import validator from "validator";

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain atleast 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain atleast 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain exact 10 digits"],
    maxLength: [10, "Phone number must contain exact 10 digits"],
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "Message must contain minimum 10 characters"],
  },
});

// to make a model, pass model name that we want to store it as,  then the schema to make it
export const Message = mongoose.model("Message", messageSchema);
