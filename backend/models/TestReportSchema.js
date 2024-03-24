import mongoose from "mongoose";
import User from "./UserSchema.js";

// Define a schema for individual test results
const TestResultSchema = new mongoose.Schema({
  testname: String,
  testvalue: Number,
  remarks:String,
 
});



const testReportSchema = new mongoose.Schema(
  {
    doctor: {
      type: String,
      // ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    
    result: {
      type: String,
    },
    testpackage: String, // Name of the test package
  tests: [TestResultSchema],
   
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

testReportSchema.pre(/^find/, function (next) {
  this.populate({
    path: "doctor",
    select: "name photo",
  });

  next();
});



export default mongoose.model("TestReport", testReportSchema);