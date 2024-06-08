import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middleware/auth.js";

// router is a middleware that acts as a traffic controller by directing incoming requests to approriate handler functions (which are based on url and methods)
const router = express.Router();

// this route handler is for post request
// all post requests sent to /send url will be handled by sendMessage function
router.post("/send", sendMessage);

// ensuring all msgs are accessed by admin only
router.get("/getall", isAdminAuthenticated, getAllMessages);
export default router;
