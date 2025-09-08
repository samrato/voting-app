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
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(upload());

// Routes
app.use("/api", Routes);
app.use(notFound);
app.use(errorHandler);

// Database + Server
const startServer = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log("✅ Database connected successfully");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB", err.message);
    process.exit(1);
  }
};

startServer();
