import FeedbackSchema from "../models/FeedbackSchema.js"
import User from "../models/UserSchema.js"


export const createFeedback = async (req,res)=>{
    if(!req.body.user) req.body.user = req.userId

    const newFeedback = new Feedback(req.body)

    try{
        const savedFeedback = await newFeedback.save()

        

        res.status(200).json({success:true, message:'Message submittedd', data:savedFeedback})
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}

export const getAllFeedbacks = async (req, res) => {
  try {
    const { query } = req.query;
    let product;

    if (query) {
        product = await FeedbackSchema.find({
        
        $or: [
          { name: { $regex: query, $options: "i" } },
          { bio: { $regex: query, $options: "i" } },
        ],
      });
    } else {
        product = await FeedbackSchema.find()
       
    }

    res
      .status(200)
      .json({ success: true, message: "dtests foundd", data: product });
  } catch (err) {
    res.status(404).json({ success: false, message: "nott found" });
  }
};