import TestBooking from "../models/TestBookingSchema.js";


export const getAllTestBookings = async (req, res) => {
    try {
      const reviews = await TestBooking.find();
  
      res
        .status(200)
        .json({ success: true, message: "Successful", data: reviews });
    } catch (err) {
      res.status(404).json({ success: false, message: "not found" });
    }
  };

  export const getSingleTestBook = async (req, res) => {
    const id = req.params.id;
  
    try {
      const test = await TestBooking.findById(id)
        
  
      res
        .status(200)
        .json({ success: true, message: "Test foundd", data: test });
    } catch (err) {
      res.status(404).json({ success: false, message: "no test found" });
    }
  };