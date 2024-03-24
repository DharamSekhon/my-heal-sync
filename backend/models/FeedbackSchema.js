import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    Subject: String,
    Message: String,
  },
  {
    timestamps: true,
  }
);
FeedbackSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

export default mongoose.model("Feedback", FeedbackSchema);
