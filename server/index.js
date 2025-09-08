const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();
const upload = require("express-fileupload");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const Routes = require("./routes/Routes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:3000",               // React local dev
    "https://your-frontend-domain.com"     // ⬅️ Replace with your deployed frontend domain (Netlify/Vercel/etc.)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Routes
app.use("/api", Routes);

// CORS test route (optional for debugging)
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is working " });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Database + Server
const startServer = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log(" Database connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(` Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to connect to DB", err.message);
    process.exit(1);
  }
};

startServer();
