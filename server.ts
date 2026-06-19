import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON middleware
app.use(express.json());

// ----------------------------------------------------
// MongoDB Connection Setup
// ----------------------------------------------------
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://nmrahman1652_db_user:sKSv9UslMCGBXV5W@cluster0.b8ffyum.mongodb.net/?appName=Cluster0";

console.log("Connecting to MongoDB...");
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
    // Seed initial demo data if collections are empty
    seedInitialDemoData();
  })
  .catch((err) => {
  console.error("MongoDB connection error:");
  console.error("Name:", err.name);
  console.error("Message:", err.message);
  console.error("Code:", err.code);
  console.error(err);
});

// ----------------------------------------------------
// Mongoose Models
// ----------------------------------------------------
const appointmentSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  petName: { type: String, required: true },
  petType: { type: String, enum: ["Dog", "Cat", "Bird", "Rabbit", "Other"], required: true },
  doctorSelection: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Confirmed", "Completed", "Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("ContactMessage", contactSchema);

// ----------------------------------------------------
// Seed Data Function (Ensures Demo App has Rich Displays)
// ----------------------------------------------------
async function seedInitialDemoData() {
  try {
    const appointmentCount = await AppointmentModel.countDocuments();
    if (appointmentCount === 0) {
      console.log("Seeding base appointments for veterinary dashboard demo...");
      const sampleAppointments = [
        {
          ownerName: "Sarah Jenkins",
          email: "sarah.j@example.com",
          phone: "+1 (555) 234-5678",
          petName: "Max",
          petType: "Dog",
          doctorSelection: "Dr. Sarah Mitchell",
          preferredDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // Tomorrow
          status: "Confirmed",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          ownerName: "David Miller",
          email: "davidm@example.com",
          phone: "+1 (555) 876-5432",
          petName: "Luna",
          petType: "Cat",
          doctorSelection: "Dr. Alex Mercer",
          preferredDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
          status: "Pending",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          ownerName: "Robert Davis",
          email: "robbie.d@example.com",
          phone: "+1 (555) 456-7890",
          petName: "Rocky",
          petType: "Dog",
          doctorSelection: "Dr. Elena Rostova",
          preferredDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // Yesterday
          status: "Completed",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        },
        {
          ownerName: "Emily Watson",
          email: "emily.w@example.com",
          phone: "+1 (555) 345-6789",
          petName: "Bella",
          petType: "Rabbit",
          doctorSelection: "Dr. James Carter",
          preferredDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
          status: "Pending",
          createdAt: new Date(Date.now() - 1000 * 60 * 24 * 60 * 5),
        },
        {
          ownerName: "Michael Green",
          email: "mgreen@example.com",
          phone: "+1 (555) 678-1234",
          petName: "Coco",
          petType: "Dog",
          doctorSelection: "Dr. Sarah Mitchell",
          preferredDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
          status: "Confirmed",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
        },
        {
          ownerName: "Jessica Alba",
          email: "jessica@example.com",
          phone: "+1 (555) 901-2345",
          petName: "Oliver",
          petType: "Cat",
          doctorSelection: "Dr. Sophia Vance",
          preferredDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          status: "Completed",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        },
      ];
      await AppointmentModel.insertMany(sampleAppointments);
      console.log("Demo appointments seeded successfully.");
    }

    const contactCount = await ContactModel.countDocuments();
    if (contactCount === 0) {
      console.log("Seeding sample contact messages for dashboard demo...");
      const sampleContacts = [
        {
          name: "Alice Thompson",
          email: "alice.t@example.com",
          subject: "Inquiry about exotic bird dental checkup",
          message: "Hi, do you have specialists who can look after Macaws? She seems to have a minor beak irritation. Thank you!",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        },
        {
          name: "Thomas Higgins",
          email: "tom.hog@example.com",
          subject: "Vaccination Package Pricing",
          message: "I just got a 10-week-old Golden Retriever. Could you send me the price details and schedule for puppy vaccine bundles?",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          name: "Maria Ruiz",
          email: "mruiz@example.com",
          subject: "Grooming schedules",
          message: "Is it possible to schedule a grooming and dental cleaning on the same day for our Persian Cat? Let me know.",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
        },
      ];
      await ContactModel.insertMany(sampleContacts);
      console.log("Demo contact messages seeded successfully.");
    }
  } catch (error) {
    console.error("Error seeding initial data:", error);
  }
}

// ----------------------------------------------------
// API Endpoints
// ----------------------------------------------------

// 1. APPOINTMENTS CONTROLLER

// Create an appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const { ownerName, email, phone, petName, petType, doctorSelection, preferredDate } = req.body;
    if (!ownerName || !email || !phone || !petName || !petType || !doctorSelection || !preferredDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newAppointment = new AppointmentModel({
      ownerName,
      email,
      phone,
      petName,
      petType,
      doctorSelection,
      preferredDate: new Date(preferredDate),
      status: "Pending",
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (err: any) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ error: "Failed to store appointment in MongoDB", details: err.message });
  }
});

// Get all appointments
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await AppointmentModel.find().sort({ preferredDate: -1 });
    res.json(appointments);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch appointments from MongoDB", details: err.message });
  }
});

// Update appointment status
app.patch("/api/appointments/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Confirmed", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updated = await AppointmentModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update appointment", details: err.message });
  }
});

// Delete appointment
app.delete("/api/appointments/:id", async (req, res) => {
  try {
    const deleted = await AppointmentModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully", id: req.params.id });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete appointment", details: err.message });
  }
});


// 2. CONTACTS CONTROLLER

// Create new contact message
app.post("/api/contacts", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = new ContactModel({ name, email, subject, message });
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to save contact message", details: err.message });
  }
});

// Get all contact messages
app.get("/api/contacts", async (req, res) => {
  try {
    const messages = await ContactModel.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch contact messages", details: err.message });
  }
});

// Delete a contact message
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const deleted = await ContactModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ message: "Contact message deleted successfully", id: req.params.id });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete message", details: err.message });
  }
});


// 3. ENHANCED DASHBOARD STATS CONTROLLER
app.get("/api/stats", async (req, res) => {
  try {
    const appointmentsCount = await AppointmentModel.countDocuments();
    const contactsCount = await ContactModel.countDocuments();

    // Aggregates for pet types to display in charts
    const petTypeBreakdown = await AppointmentModel.aggregate([
      { $group: { _id: "$petType", value: { $sum: 1 } } }
    ]);

    // Format for PieChart
    const petData = petTypeBreakdown.map((item) => ({
      name: item._id,
      value: item.value,
    }));

    // Group appointments by date (last 7 days) to display in AreaChart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const appointmentsByDate = await AppointmentModel.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          appointments: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Ensure we fill missing days for a pretty chart
    const dailyTrend = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const str = d.toISOString().split("T")[0];
      const match = appointmentsByDate.find((item) => item._id === str);
      dailyTrend.push({
        date: d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" }),
        appointments: match ? match.appointments : 0,
        visitors: Math.floor(Math.random() * 30) + 15, // dynamic demo visitor data
      });
    }

    res.json({
      totalAppointments: appointmentsCount,
      totalVisitors: 843 + appointmentsCount * 12, // realistic projection
      totalDoctors: 6, // 6 featured experts
      totalMessages: contactsCount,
      growth: {
        appointments: appointmentsCount > 0 ? 15 : 0,
        visitors: 8.4,
        messages: contactsCount > 0 ? 12 : 0,
      },
      petData: petData.length > 0 ? petData : [
        { name: "Dog", value: 4 },
        { name: "Cat", value: 3 },
        { name: "Rabbit", value: 1 }
      ],
      dailyTrend,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to compile stats", details: err.message });
  }
});


// ----------------------------------------------------
// Serve Frontend Assets & Vite integration
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Spinning up Vite Development Server...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving built production assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Paws & Care Server and Vite applet booting on http://localhost:${PORT}`);
  });
}

startServer();
