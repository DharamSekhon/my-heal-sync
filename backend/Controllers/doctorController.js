import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import TestBooking from "../models/TestBookingSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updateDoctor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to updatedd" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    res
      .status(200)
      .json({ success: true, message: "Doctor foundd", data: doctor });
  } catch (err) {
    res.status(404).json({ success: false, message: "no Doctor found" });
  }
};




export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res
      .status(200)
      .json({ success: true, message: "doctors foundd", data: doctors });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

//old backend
export const getDoctorProfile = async(req,res)=>{
  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({doctor:doctorId})
    
    const tests = await TestBooking.find()

    res
      .status(200)
      .json({
        succes: true,
        message: "Profile info is getting",
        data: { ...rest, appointments, tests },
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
}
