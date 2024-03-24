import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import LabTest from "../models/LabTestSchema.js";

export const updateLabTest = async (req, res) => {
  const id = req.params.id;

  try {
    const updateLabTest = await LabTest.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "successfully updatedd",
      data: updateLabTest,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed too updatedd" });
  }
};

export const deleteLabTest = async (req, res) => {
  const id = req.params.id;

  try {
    await LabTest.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "LabTest deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to delete" });
  }
};

export const getSingleLabTest = async (req, res) => {
  const id = req.params.id;

  try {
    const labTest = await LabTest.findById(id)
      

    
    res
      .status(200)
      .json({ success: true, message: "Doctor found", data: labTest });
  } catch (err) {
    res.status(404).json({ success: false, message: "no test found" });
  }
};

export const getAllLabTest = async (req, res) => {
  try {
    const { query } = req.query;
    let labTest;

    if (query) {
      labTest = await LabTest.find({
        
        $or: [
          { name: { $regex: query, $options: "i" } },
          { bio: { $regex: query, $options: "i" } },
        ],
      });
    } else {
        labTest = await LabTest.find()
       
    }

    res
      .status(200)
      .json({ success: true, message: "tests foundd", data: labTest });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};


export const createLabTest = async(req,res)=>{

    if(!req.body.doctor) req.body.doctor = req.params.doctorId
    if(!req.body.user) req.body.user = req.userId

    const newLabTest = new LabTest(req.body)

    try{
        const savedLabTest = await newLabTest.save()

        // await Doctor.findByIdAndUpdate(req.body.doctor, {
        //     $push: {: savedLabTest._id}
        // })

        res.status(200).json({success:true, message:'labtest created submittedd', data:savedLabTest})
    }catch(err){
        res.status(500).json({success:false, message: err.message})

    }
}

//old backend
// export const getLabTest = async(req,res)=>{
//   const doctorId = req.userId;

//   try {
//     const doctor = await LabTest.findById(doctorId);

//     if (!doctor) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Doctor not found" });
//     }

//     const { password, ...rest } = doctor._doc;
//     const appointments = await Booking.find({doctor:doctorId})

//     res
//       .status(200)
//       .json({
//         succes: true,
//         message: "Profile info is getting",
//         data: { ...rest, appointments },
//       });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, message: "Something went wrong, cannot get" });
//   }
// }
