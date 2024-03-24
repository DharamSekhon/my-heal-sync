import mongoose from "mongoose";

const testBookingSchema = new mongoose.Schema(
  {
    labTest: {
      type: mongoose.Types.ObjectId,
      ref: "LabTest",
      required: true,
    },
    testname: {
      type: String,
      ref: "testname",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: { type: String, required: true },
    // appointmentDate: {
    //   type: Date,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

testBookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "labTest",
    select: "name",
  });

  next();
});

export default mongoose.model("TestBooking", testBookingSchema);
