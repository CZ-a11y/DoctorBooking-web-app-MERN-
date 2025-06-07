import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateDoctor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: doctor,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No Doctor found" });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, "-password");

    res.status(200).json({
      success: true,
      message: "Doctors found",
      data: doctors,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getDoctorProfile = async (req, res) => {
  try {
    // Get doctorId from authenticated user (assuming you set req.user in auth middleware)
    const doctorId = req.user.id;

    // Validate doctorId
    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    // Find doctor and exclude password
    const doctor = await Doctor.findById(doctorId)
      .select("-password") // Exclude password
      .populate("specialization") // Example of populating references
      .lean(); // Convert to plain JS object

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Get appointments
    const appointments = await Booking.find({ doctor: doctorId })
      .populate("user", "name email") // Example population
      .populate("timeSlot");

    res.status(200).json({
      success: true,
      message: "Doctor profile retrieved successfully",
      data: {
        ...doctor,
        appointments,
      },
    });
  } catch (err) {
    console.error("Error fetching doctor profile:", err);
    res.status(500).json({
      success: false,
      message: "Error retrieving doctor profile",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
