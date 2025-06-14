import express from "express";
import {
  addDoctor,
  adminAllAppointments,
  AdminDashBoardData,
  adminLogin,
  AllDoctors,
  AppointmentCancelAdmin,

} from "../controllers/Admincontroller.js";
import { changeAvailibility } from "../controllers/Doctorscontoller.js";
import upload from "../middlewares/multer.js";
import AuthAdmin from "../middlewares/AuthAdmin.js";

const Adminrouter = express.Router();
Adminrouter.post("/add_doctor", AuthAdmin, upload.single("image"), addDoctor);
Adminrouter.post("/adminLogin", adminLogin);
Adminrouter.post("/AllDoctors", AuthAdmin, AllDoctors);
Adminrouter.post("/changeAvailibility", AuthAdmin, changeAvailibility);
Adminrouter.get("/adminAllAppointments", AuthAdmin, adminAllAppointments);
Adminrouter.post("/AppointmentCancelAdmin", AuthAdmin, AppointmentCancelAdmin);
Adminrouter.get("/AdminDashBoardData", AuthAdmin, AdminDashBoardData);

export default Adminrouter;
