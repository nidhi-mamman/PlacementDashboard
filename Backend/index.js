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
  origin: ["http://localhost:5173", "https://placementdashboard.onrender.com"],
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

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on Port ${process.env.PORT}`);
});
