import mongoose from "mongoose";

const LabTestSchema = new mongoose.Schema({
  //   name: { type: String, required: true, unique: true },
  name: { type: String },
  bio: { type: String},
  price: { type: Number },
  tests: { type: Array },
  sample: { type: String },
  fasting:{type:String},
  tube:{type: String}
  

  
},{ timestamps: true });

export default mongoose.model("LabTest", LabTestSchema);
