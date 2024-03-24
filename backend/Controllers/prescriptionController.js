
import Review from "../models/ReviewSchema.js";
import User from "../models/UserSchema.js";
import Prescription from "../models/PrescriptionSchema.js";

//get all reviews
export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({});

    res
      .status(200)
      .json({ success: true, message: "Successful", data: prescriptions });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

export const getSinglePrescription = async (req, res) => {
    const id = req.params.id;
  
    try {
      const prescription = await Prescription.findById(id)
        
  
      res
        .status(200)
        .json({ success: true, message: "Prescription found", data: prescription });
    } catch (err) {
      res.status(404).json({ success: false, message: "no test found" });
    }
  };


//create review
export const createPrescriptions = async(req,res)=>{

    if(!req.body.user) req.body.user = req.params.userId
    if(!req.body.doctor) req.body.doctor = req.doctorId

    const newPrescription = new Prescription(req.body)

    try{
        const savedPrescription = await newPrescription.save()

        await User.findByIdAndUpdate(req.body.user, {
            $push: {prescriptions: savedPrescription._id}
        })

        res.status(200).json({success:true, message:'submitted', data:savedPrescription})
    }catch(err){
        res.status(500).json({success:false, message: err.message})

    }
}