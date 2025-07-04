import validator from "validator";
import bcrypt from 'bcryptjs';
import DOCTOR from "../models/doctorModel.js";
import USER from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import APPOINTMENT from "../models/Appointment.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "missing data",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please create strong password",
      });
    }
    //encrypt password

    const hashedPassword = await bcrypt.hash(password, 10);

    // image into url useCloudinary

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    }); //path,type
    const imageUrl = imageUpload.secure_url;

    // create doctor data
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    // store in database
    const doctor = new DOCTOR(doctorData);
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor Created Succes",
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

// admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email != process.env.ADMIN_EMAIL ||
      password != process.env.ADMIN_PASSWORD
    ) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials to Access",
      });
    } else {
      // then create token
      const token = jwt.sign(
        process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD,
        process.env.JWT_SECRETKEY
      );

      return res.status(200).json({
        success: true,
        TOKEN: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get All Doctors
const AllDoctors = async (req, res) => {
  try {
    const doctors = await DOCTOR.find({}).select("-password");
    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// all Appointments

const adminAllAppointments = async (req, res) => {
  try {
    const appointments = await APPOINTMENT.find({});

    res.status(200).json({
      success: true,
      appointments: appointments,
      message: "All Appointments get Success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const AppointmentCancelAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    console.log(appointmentId);
    const appointmentData = await APPOINTMENT.findById(appointmentId);

    console.log(appointmentData);

    await APPOINTMENT.findByIdAndUpdate(appointmentId, { cancelled: true });

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await DOCTOR.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (item) => item !== slotTime
    );
    await DOCTOR.findByIdAndUpdate(docId, { slots_booked });

    res
      .status(200)
      .json({ success: true, message: "Appointment Cancelled Success" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const AdminDashBoardData = async (req, res) => {
  try {
    const doctors = await DOCTOR.find({});
    const users = await USER.find({});
    const appointments = await APPOINTMENT.find({});

    const dashData = {
      doctors: doctors.length,
      users: users.length,
      appointments: appointments.reverse().slice(0, 5),
    };

    res.status(200).json({
      success: true,
      dashData: dashData,
      message: "Dashboard data Get Success",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addDoctor,
  adminLogin,
  AllDoctors,
  adminAllAppointments,
  AppointmentCancelAdmin,
  AdminDashBoardData,
};
