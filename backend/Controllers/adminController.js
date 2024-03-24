import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import TestBooking from "../models/TestBookingSchema.js";
import User from "../models/UserSchema.js";
import TestReport from "../models/TestReportSchema.js";
import Prescription from "../models/PrescriptionSchema.js";
import ProductBooking from "../models/ProductBookingSchema.js";
// import Booking from "../models/BookingSchema.js";

export const getAllDocAdmin = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({}).select("-password");
    }

    res
      .status(200)
      .json({ success: true, message: "Doctors found", data: doctors });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getAllUserAdmin = async (req, res) => {
  try {
    const users = await User.find({role:"patient"}).select("-password");

    res
      .status(200)
      .json({ success: true, message: "Users found", data: users });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const users = await User.find({role:"admin"}).select("-password");

    res
      .status(200)
      .json({ success: true, message: "users found", data: users });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

export const getAllAppointmentsAdmin = async (req, res) => {
  try {
    //step-1: retrieve appointments from bookings
    const bookings = await Booking.find({});

    //steo-2: extract doctor ids from appointment bookings
   

    //step-3: retrieve doctors using doctor ids
  

    res.status(200).json({
      succes: true,
      message: "Appointments are getting",
      data: bookings,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getAllTestsAdmin = async (req, res) => {
  try {
    //step-1: retrieve appointments from bookings
    const bookings = await TestBooking.find({});

    //steo-2: extract doctor ids from appointment bookings
   

    //step-3: retrieve doctors using doctor ids
  

    res.status(200).json({
      succes: true,
      message: "Bookings are getting",
      data: bookings,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getAllReportsAdmin = async (req, res) => {
  try {
    //step-1: retrieve appointments from bookings
    const bookings = await TestReport.find({});

    //steo-2: extract doctor ids from appointment bookings
   

    //step-3: retrieve doctors using doctor ids
  

    res.status(200).json({
      succes: true,
      message: "Bookings are getting",
      data: bookings,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};


export const getAllPrescriptionsAdmin = async (req, res) => {
  try {
    //step-1: retrieve appointments from bookings
    const bookings = await Prescription.find({});

    //steo-2: extract doctor ids from appointment bookings
   

    //step-3: retrieve doctors using doctor ids
  

    res.status(200).json({
      succes: true,
      message: "Prescription are getting",
      data: bookings,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};


export const getAllOrdersAdmin = async (req, res) => {
  try {
    //step-1: retrieve appointments from bookings
    const bookings = await ProductBooking.find({});

    //steo-2: extract doctor ids from appointment bookings
   

    //step-3: retrieve doctors using doctor ids
  

    res.status(200).json({
      succes: true,
      message: "Orders are getting",
      data: bookings,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getAdminProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId)

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

export const AddAdmin = async(req,res)=>{

 

  const newAdmin = new Prescription(req.body)

  try{
      const savedAdmin = await newAdmin.save()

      

      res.status(200).json({success:true, message:'Admin added', data:savedAdmin})
  }catch(err){
      res.status(500).json({success:false, message: err.message})

  }
}






//old backend
