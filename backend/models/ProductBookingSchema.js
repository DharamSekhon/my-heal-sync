import mongoose from "mongoose";

const productBookingSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productname: {
        type: String,
        ref: "productname",
        required: true,
      },
    
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: { type: String, required: true },
    
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

productBookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "product",
    select: "title",
  });

  next();
});

export default mongoose.model("ProductBooking", productBookingSchema);
