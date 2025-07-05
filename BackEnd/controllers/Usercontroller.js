import validator from "validator";
import USER from "../models/userModel.js";
import DOCTOR from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import APPOINTMENT from "../models/Appointment.js";
import mongoose from "mongoose";
import razorpay from "razorpay";

// Sign Up user

const RegisterUser = async (req, res) => {
  try {
    console.log("📥 API HIT: RegisterUser");

    const { fullName, email, password } = req.body;
    console.log("➡️ fullName:", fullName);
    console.log("➡️ email:", email);
    console.log("➡️ password:", password);
    console.log("📦 req.body:", req.body);

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Values",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email type",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Please create a strong password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new USER({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRETKEY);
    console.log("✅ Generated Token:", token);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      TOKEN: token,
    });
  } catch (error) {
    console.error(" Registration Error:", error.message); // error checking
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await USER.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    // compare password if don't match  then store error

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // verify jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY);
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
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get Profile data
const getProfileData = async (req, res) => {
  const { userId } = req.body;

  const userdata = await USER.findById(userId);
  if (!userdata) {
    res.status(400).json({
      success: false,
      message: "User do not found",
    });
  }

  res.status(200).json({
    success: true,
    message: userdata,
  });
};

// update profile
const updateProfileData = async (req, res) => {
  const { userId, fullName, email, phoneNumber, address, dob, gender } =
    req.body;
  const imageFile = req.file;
  if (!fullName || !dob || !gender || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Missing values for updating",
    });
  }

  const user = await USER.findByIdAndUpdate(userId, {
    fullName,
    email,
    phoneNumber,
    address: JSON.parse(address),
    dob,
    gender,
  });

  if (imageFile) {
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    await USER.findByIdAndUpdate(userId, { image: imageUrl });
  }

  res.status(200).json({
    success: true,
    message: "Profile Updated Success ",
    User: user,
  });
};

// book appointmnet
const BooknewAppointment = async (req, res) => {
  try {
    const { userId, docId, slotTime, slotDate } = req.body;
    console.log(userId);

    console.log("docId:" + docId);

    const docData = await DOCTOR.findById(docId).select("-password");
    if (!docData) {
      return res.status(400).json({
        success: false,
        message: "Doctor not available",
      });
    }
    console.log(docData);
    let slots_booked = docData.slots_booked;
    console.log("avai;able");
    // check if slots available at date and time
    if (slots_booked[slotDate]) {
      //already date booked

      if (slots_booked[slotDate].includes(slotTime)) {
        //on that day same time is also booked
        return res.status(400).json({
          success: false,
          message: "slots already booked",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      //date is open
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    console.log("before user ");
    const userData = await USER.findById(userId).select("-password");
    console.log(userData);
    delete docData.slots_booked;
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // make object data
    const appointmentdata = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),
      slotTime,
      slotDate,
    };

    const newAppointment = new APPOINTMENT(appointmentdata);
    await newAppointment.save();

    // update slots_booked in doctors model
    await DOCTOR.findByIdAndUpdate(docId, { slots_booked });

    res.status(201).json({
      success: true,
      message: "Appointment Booked",
      data: newAppointment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await APPOINTMENT.find({ userId });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const CancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await APPOINTMENT.findById(appointmentId);

    console.log(appointmentData);
    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized Action",
      });
    }

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

// razorpay payment Integration

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PaymentRazorPay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentdata = await APPOINTMENT.findById(appointmentId);
    if (!appointmentdata || appointmentdata.cancelled) {
      return res.status(400).json({
        success: false,
        message: "Appointment Cancelled or Not Found",
      });
    }

    // creating option for

    const option = {
      amount: appointmentdata.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // make payment model
    const order = await razorpayInstance.orders.create(option);

    res.status(200).json({
      success: true,
      order: order,
      message: "Paymemt Done Success",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// verify payment

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    console.log(orderInfo);
    if (orderInfo.status === "paid") {
      await APPOINTMENT.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      return res.status(200).json({
        success: true,
        message: "Paymemt Successfull",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Paymemt FAILED",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  RegisterUser,
  loginUser,
  getProfileData,
  updateProfileData,
  BooknewAppointment,
  listAppointment,
  CancelAppointment,
  PaymentRazorPay,
  verifyPayment,
};
