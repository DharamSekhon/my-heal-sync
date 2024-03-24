import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoute from "./Routes/booking.js";
import labTestRoute from "./Routes/labTest.js";
import prescriptionRoute from "./Routes/prescription.js";
import testRoute from "./Routes/test.js";
import reportRoute from "./Routes/reports.js";
import adminRoute from "./Routes/admin.js";
import productRoute from "./Routes/product.js";
import feedbackRoute from "./Routes/feedback.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

//database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });

    console.log("MongoDB database is connected");
  } catch (err) {
    console.log("Mongodb connection failed");
  }
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/labs", labTestRoute);
app.use("/api/v1/prescriptions", prescriptionRoute);
app.use("/api/v1/tests", testRoute);
app.use("/api/v1/reports", reportRoute);
app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/feedbacks", feedbackRoute);

app.listen(port, () => {
  console.log("Server is running on prot " + port);
  connectDB();
});