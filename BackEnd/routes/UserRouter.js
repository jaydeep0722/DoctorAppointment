import express from "express";
import {
  BooknewAppointment,
  CancelAppointment,
  getProfileData,
  listAppointment,
  PaymentRazorPay,
  RegisterUser,
  updateProfileData,
  verifyPayment,
} from "../controllers/Usercontroller.js";
import { loginUser } from "../controllers/Usercontroller.js";
import AuthUser from "../middlewares/AuthUser.js";
import upload from "../middlewares/multer.js";

const UserRouter = express.Router();

UserRouter.post("/registerUser", RegisterUser);
UserRouter.post("/loginUser", loginUser);
UserRouter.get("/getProfileData", AuthUser, getProfileData);
UserRouter.post(
  "/updateProfileData",
  upload.single("image"),
  AuthUser,
  updateProfileData
);
UserRouter.post("/BooknewAppointment", AuthUser, BooknewAppointment);
UserRouter.get("/appointments", AuthUser, listAppointment);
UserRouter.post("/CancelAppointment", AuthUser, CancelAppointment);
UserRouter.post("/PaymentRazorPay", AuthUser, PaymentRazorPay);
UserRouter.post("/verifyPayment", AuthUser, verifyPayment);


export default UserRouter;
