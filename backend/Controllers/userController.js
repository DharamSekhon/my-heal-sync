import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import TestBooking from "../models/TestBookingSchema.js";
import LabTest from "../models/LabTestSchema.js";
import Prescription from "../models/PrescriptionSchema.js";
import TestReport from "../models/TestReportSchema.js";
import ProductBooking from "../models/ProductBookingSchema.js";
import Product from "../models/ProductSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed too updated" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "user deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed too delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id)
      .populate("prescriptions")
      .populate("reports")

      .select("-password");

    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (err) {
    res.status(404).json({ success: false, message: "no user found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res
      .status(200)
      .json({ success: true, message: "users found", data: users });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

//from old backend
export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      succes: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    //step-1: retrieve appointments from bookings
    const bookings = await Booking.find({ user: req.userId });

    //steo-2: extract doctor ids from appointment bookings
    const doctorIds = bookings.map((el) => el.doctor.id);

    //step-3: retrieve doctors using doctor ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res.status(200).json({
      succes: true,
      message: "Appointments are getting",
      data: doctors,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getMyTests = async (req, res) => {
  try {
    //step-1: retrieve appointments from bookings
    const testBookings = await TestBooking.find({ user: req.userId });

    //steo-2: extract doctor ids from appointment bookings
    const testIds = testBookings.map((el) => el.labTest.id);

    //step-3: retrieve doctors using doctor ids
    const tests = await LabTest.find({ _id: { $in: testIds } });

    res.status(200).json({
      succes: true,
      message: "Appointments tests are getting",
      data: tests,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    //step-1: retrieve appointments from bookings
    const productBookings = await ProductBooking.find({ user: req.userId });

    //steo-2: extract doctor ids from appointment bookings
    const productIds = productBookings.map((el) => el.product.id);

    //step-3: retrieve doctors using doctor ids
    const products = await Product.find({ _id: { $in: productIds } });

    res.status(200).json({
      succes: true,
      message: "Appointments tests are getting",
      data: products,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getMyPrescriptions = async (req, res) => {
  try {
    //step-1: retrieve appointments from bookings
    const prescriptionBookings = await Prescription.find({ user: req.userId });

    //steo-2: extract doctor ids from appointment bookings
    const prescriptionIds = prescriptionBookings.map(
      (el) => el.prescription.id
    );

    //step-3: retrieve doctors using doctor ids
    const prescriptions = await Prescription.find({
      _id: { $in: prescriptionIds },
    });

    res.status(200).json({
      succes: true,
      message: "Appointments tests are getting",
      data: prescriptions,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getMyReports = async (req, res) => {
  try {
    //step-1: retrieve appointments from bookings
    const reportGen = await TestReport.find({ user: req.userId });

    //steo-2: extract doctor ids from appointment bookings
    const reportsIds = reportGen.map((el) => el.reports.id);

    //step-3: retrieve doctors using doctor ids
    const reports = await TestReport.find({
      _id: { $in: reportsIds },
    });

    res.status(200).json({
      succes: true,
      message: "tests reports are getting",
      data: reports,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};
