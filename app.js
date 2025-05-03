require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./db/connect.js");
const daysRouter = require("./routes/days.js");
const entriesRouter = require("./routes/entries.js")

const app = express();
app.use(cors()); // allow requests from Flutter
app.use(express.json());

// Example route
app.get("/api/v1/hello", (req, res) => {
  res.json({ message: "Hello from backend" });
});

const port = process.env.PORT || 5000;

app.use("/api/v1/days", daysRouter);
app.use("/api/v1/entries", entriesRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Mongo DB connected")
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
