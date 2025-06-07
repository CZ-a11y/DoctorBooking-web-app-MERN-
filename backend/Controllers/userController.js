import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId).select("-password -__v").lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve profile information",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // Retrieve appointments and populate doctor info in a single query
    const bookings = await Booking.find({ user: req.userId })
      .populate({
        path: "doctor",
        select: "-password -__v -createdAt -updatedAt",
      })
      .select("-__v -createdAt -updatedAt")
      .lean();

    if (!bookings.length) {
      return res.status(404).json({
        success: false,
        message: "No appointments found",
      });
    }

    // Extract doctor details from populated bookings
    const appointments = bookings.map((booking) => ({
      appointmentId: booking._id,
      date: booking.appointmentDate,
      ticketPrice: booking.ticketPrice,
      status: booking.status,
      doctor: booking.doctor,
    }));

    res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully",
      count: appointments.length,
      data: appointments,
    });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve appointments",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
