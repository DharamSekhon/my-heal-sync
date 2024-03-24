import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let user = null;

    if (role == "patient") {
      user = await User.findOne({ email });
    } else if (role == "doctor") {
      user = await Doctor.findOne({ email });
    }else if (role == "admin") {
      user = await User.findOne({ email });
    }
    

    //check if user exist
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role == "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    if (role == "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    if (role == "admin") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User created successfully.." });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error, try again" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    const admin = await User.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    if (admin) {
      user = admin;
    }


    //check if user exist or not
    if (!user) {
      return res.status(404).json({ message: "User not found, dont" });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "invalid credentialss" });
    }

    // get token
    const token = generateToken(user);

    const { password, role, appointments,  ...rest } = user._doc;
    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "failed to loginn" });
  }
};

// export const loginAdmin = async (req, res) => {
//   const { email } = req.body;
//   try {
//     let user = null;

//     const admin = await User.findOne({ email });
    

//     if (admin) {
//       user = admin;
//     }
    
//     //check if user exist or not
//     if (!user) {
//       return res.status(404).json({ message: "You are not Admin" });
//     }

//     const isPasswordMatch = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!isPasswordMatch) {
//       return res
//         .status(400)
//         .json({ status: false, message: "invalid credentialss" });
//     }

//     // get token
//     const token = generateToken(user);

//     const { password, role, appointments, ...rest } = user._doc;
//     res.status(200).json({
//       status: true,
//       message: "Successfully login",
//       token,
//       data: { ...rest },
//       role,
//     });
//   } catch (err) {
//     res.status(500).json({ status: false, message: "failed to loginn" });
//   }
// };

export const loginAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;

    // Find the user by email
    const foundUser = await User.findOne({ email });
    
    if (foundUser && foundUser.role === "admin") {
      // If user exists and is an admin
      user = foundUser;
    } else {
      // If user does not exist or is not an admin
      return res.status(404).json({ message: "You are not an admin" });
    }
    
    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    // Extract necessary user data
    const { password, role, appointments, ...rest } = user._doc;

    // Send response with token and user data
    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
