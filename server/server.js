import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import Booking from "./models/Booking.js";
import protect from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "TechCare API is running",
  });
});

// Create booking
app.post("/api/bookings", async (req, res) => {
  try {
    const {
      name,
      phone,
      service,
      date,
      address,
      message,
    } = req.body;

    // Basic validation
    if (!name || !phone || !service || !date || !address) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Generate booking ID
    const bookingId = `TC-${Date.now()}`;

    // Create booking
    const booking = await Booking.create({
      bookingId,
      name,
      phone,
      service,
      date,
      address,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error("Booking error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
// login authentication
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const emailMatch =
      email === process.env.ADMIN_EMAIL;

    const passwordMatch =
      password === process.env.ADMIN_PASSWORD;

    if (!emailMatch || !passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
// Get all bookings
app.get("/api/bookings",protect, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch bookings",
    });
  }
});

// UPDATE BOOKING STATUS
app.put(
  "/api/bookings/:id/status",
  protect,
  async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Assigned",
      "In Progress",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    console.error("Status update error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update booking status",
    });
  }
});
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;