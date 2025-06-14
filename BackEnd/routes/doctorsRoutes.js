import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorDashboard,
  doctorList,
  GetDoctorProfile,
  LoginDoctor,
  UpdateDoctorProfile,
} from "../controllers/Doctorscontoller.js";
import AuthDoctor from "../middlewares/AuthDoctor.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/loginDoctor", LoginDoctor);
doctorRouter.get("/appointments", AuthDoctor, appointmentsDoctor);
doctorRouter.post("/appointmentComplete", AuthDoctor, appointmentComplete);
doctorRouter.post("/appointmentCancel", AuthDoctor, appointmentCancel);
doctorRouter.get("/doctorDashboard", AuthDoctor, doctorDashboard);
doctorRouter.get("/GetDoctorProfile", AuthDoctor, GetDoctorProfile);
doctorRouter.post("/UpdateDoctorProfile", AuthDoctor, UpdateDoctorProfile);

export default doctorRouter;
