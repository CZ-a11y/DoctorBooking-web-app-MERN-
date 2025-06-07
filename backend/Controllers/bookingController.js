// import User from "../models/Userschema.js";
// import Doctor from "../models/Doctorschema.js";
// import Booking from "../models/BookingSchema.js";
// import Stripe from "stripe";

// export const getCheckoutSession = async (req, res) => {
//   try {
//     // Get currently booked doctor and user
//     const doctor = await Doctor.findById(req.params.doctorId);
//     if (!doctor) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Doctor not found" });
//     }

//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//     // Create stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
//       cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
//       customer_email: user.email,
//       client_reference_id: req.params.doctorId, // corrected from customer_reference_id to client_reference_id
//       line_items: [
//         {
//           price_data: {
//             currency: "xof", // CFA is XOF in Stripe
//             unit_amount: doctor.ticketPrice * 100, // Stripe amounts are in cents
//             product_data: {
//               name: `Dr. ${doctor.name}`,
//               description: doctor.bio,
//               images: [doctor.photo],
//             },
//           },
//           quantity: 1, // fixed syntax - quantity should be inside line_item object
//         },
//       ],
//     });

//     // Create new booking
//     const booking = new Booking({
//       doctor: doctor._id,
//       user: user._id,
//       ticketPrice: doctor.ticketPrice,
//       session: session.id,
//       status: "pending", // added status field
//     });

//     await booking.save();

//     res.status(200).json({
//       success: true,
//       message: "Checkout session created successfully",
//       sessionId: session.id,
//     });
//   } catch (err) {
//     console.error("Error creating checkout session:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message || "Error creating checkout session",
//     });
//   }
// };
