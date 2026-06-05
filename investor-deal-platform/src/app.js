const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");
const dealRoutes = require("./routes/dealRoutes");
const preferenceRoutes = require("./routes/preferenceRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const errorHandler = require("./middleware/errorHandler");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use(limiter);

app.use("/api/auth", authRoutes);

app.use("/api/deals", dealRoutes);

app.use("/api/preferences", preferenceRoutes);

app.use("/api/investments", investmentRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use(errorHandler);

app.get("/api/profile", auth, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.get("/", (req, res) => {
    res.send("Investor Deal Platform API Running");
});

module.exports = app;