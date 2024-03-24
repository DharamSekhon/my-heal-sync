

import mongoose from "mongoose";
import User from "./UserSchema.js";

const prescriptionSchema = new mongoose.Schema(
  {
    doctor: {
      type: String,
      // ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    medications: [
      {
        name: {
          type: String,
        },
        dosage: {
          type: String,
        },
        frequency: {
          type: String,
        },
      },
    ],
    diagnosis: {
      type: String,
    },
    instructions: {
      type: String,
    },
    follow: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

prescriptionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "doctor",
    select: "name photo",
  });

  next();
});



export default mongoose.model("Prescription", prescriptionSchema);
