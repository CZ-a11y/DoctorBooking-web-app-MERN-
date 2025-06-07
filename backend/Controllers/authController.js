import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
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
    }
    //check if user exist
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    //hass password
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
    await user.save();
    res.status(200).json({
      success: true,
      meassage: "The user have been created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      meassage: "An error occured z check it",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    const user = patient || doctor;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user);

    // Prepare response data (excluding sensitive info)
    const { password: _, appointments, ...userData } = user._doc;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: userData,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error during login",
    });
  }
};
