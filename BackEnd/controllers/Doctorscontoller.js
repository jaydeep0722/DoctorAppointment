import DOCTOR from "../models/doctorModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import APPOINTMENT from "../models/Appointment.js";
const changeAvailibility = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await DOCTOR.findById(docId);

    await DOCTOR.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Availibility changed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const doctorList = async (req, res) => {
  try {
    const doctors = await DOCTOR.find({}).select(["-email", "-password"]);
    res.json({
      success: true,
      message: doctors,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// login doctor
const LoginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await DOCTOR.findOne({ email });

    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: "doctor not found",
      });
    }

    // compare password if don't match  then store error

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      // verify jwt token
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRETKEY);
      res.status(200).json({
        success: true,
        TOKEN: token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Api's to get doctor appointments for doctorPanel
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await APPOINTMENT.find({ docId });

    res.status(200).json({
      success: true,
      appointments: appointments,
      message: "All Appointments got Success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// appointmentComplete
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await APPOINTMENT.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await APPOINTMENT.findByIdAndUpdate(appointmentId, { isComplete: true });
      return res.status(200).json({
        success: true,
        message: "Appointment Completed",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Mark Failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await APPOINTMENT.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await APPOINTMENT.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.status(200).json({
        success: true,
        message: "Appointment Cancelled true",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Cancellation Failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await APPOINTMENT.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isComplete || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.status(200).json({
      success: true,
      dashData: dashData,
      message: "",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Doctor profile
const GetDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;

    const profileData = await DOCTOR.findById(docId).select("-password");
    res.status(200).json({
      success: true,
      profileData: profileData,
      message: "Profile Data Got Success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Doctor Profile
const UpdateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, adress, available } = req.body;
    await DOCTOR.findByIdAndUpdate(docId, { fees, adress, available });

    res.status(200).json({
      success: true,
      message: "Profile Updated Success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  changeAvailibility,
  doctorList,
  LoginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  GetDoctorProfile,
  UpdateDoctorProfile,
};
