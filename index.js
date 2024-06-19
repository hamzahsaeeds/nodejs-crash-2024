// there's no window objext in Nodejs
// there's not DOM so no document object
// but there exists a process object


// const { generateRandomNumber, celciusToFarenheit } = require('./utils'); // this is common js syntax

// console.log(`Random number ${generateRandomNumber()}`);
// console.log(`Celcius to Farenheit ${celciusToFarenheit(0)}`);


// import getPosts, { getPostsLength } from "./postController.js";

// console.log(getPosts());
// console.log(`Posts length: ${getPostsLength()}`)

const express = require("express");
const fs = require("fs");
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

// DB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/nodejscrash2024')
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("Mongo Error", err));

// Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
}, { timestamps: true });

// model
const User = mongoose.model("user", userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  fs.appendFile(
    "logs.txt",
    `${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    });
})

// Routes

// server side rendered HTML document response
app.get('/users', async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
      ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
  `;
  return res.send(html);
});

// endpoint to return JSON data that can be used by clients like mobile devs
// REST APIs
app.get('/api/users', async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app
  .route('/api/users/:id')
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update and return new data
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res.json(updatedUser);
    } catch (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ msg: "Error updating user" });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id); // Find and delete by ID
      if (!deletedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res.json({ msg: "User deleted successfully" });
    } catch (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ msg: "Error deleting user" });
    }
  });

app.post('/api/users', async (req, res) => {
  const body = req.body;
  const { first_name, last_name, email, gender, job_title } = body;
  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    firstName: first_name,
    lastName: last_name,
    email: email,
    gender: gender,
    jobTitle: job_title,
  });
  console.log("result", result);
  return res.status(201).json({ msg: "success" });
});



app.listen(8000, () => console.log(`Server Started at port ${PORT}`)); 