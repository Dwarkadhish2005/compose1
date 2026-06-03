const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const PORT = 5000;

 
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://mongodb:27017/studentdb";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Student = mongoose.model(
  "Student",
  StudentSchema
);

app.get("/", (req, res) => {
  res.send("Node + Mongo + Docker Working");
});

app.post("/student", async (req, res) => {
  try {
    const student = await Student.create(
      req.body
    );

    res.json(student);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});





app.get("/students", async (req, res) => {
  const students = await Student.find();

  res.json(students);
});

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});