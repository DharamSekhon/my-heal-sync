import Review from "../models/ReviewSchema.js";
import User from "../models/UserSchema.js";
import TestReport from "../models/TestReportSchema.js";

//get all reviews
export const getAllReports = async (req, res) => {
  try {
    const reports = await TestReport.find({});

    res
      .status(200)
      .json({ success: true, message: "Successful", data: reports });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

export const getSingleReport = async (req, res) => {
    const id = req.params.id;
  
    try {
      const test = await TestReport.findById(id)
        
  
      res
        .status(200)
        .json({ success: true, message: "Report found", data: test });
    } catch (err) {
      res.status(404).json({ success: false, message: "no test found" });
    }
  };


//create review
export const createReports = async(req,res)=>{

    if(!req.body.user) req.body.user = req.params.userId
    if(!req.body.doctor) req.body.doctor = req.doctorId

    const newReport = new TestReport(req.body)

    try{
        const savedReport = await newReport.save()

        await User.findByIdAndUpdate(req.body.user, {
            $push: {reports: savedReport._id}
        })

        res.status(200).json({success:true, message:'created', data:savedReport})
    }catch(err){
        res.status(500).json({success:false, message: err.message})

    }
}