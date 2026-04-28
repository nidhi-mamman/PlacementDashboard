const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./router/user");
const JobsRouter = require("./router/jobs")
const CompanyRouter = require('./router/company')
const AluminiRouter = require('./router/alumini')
const cors = require("cors");

const app = express();

// Middlewares
const corsOptions = {
  origin: ["http://localhost:5173", "https://placementdashboard-client.onrender.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", userRouter);
app.use("/api/jobs", JobsRouter);
app.use("/api/company", CompanyRouter);
app.use("/api/alumini", AluminiRouter);

const startServer = async () => {
  try {
    await connectDB(); 

    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
  }
};

startServer();
