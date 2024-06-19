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
const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// DB connection
connectMongoDb("mongodb://127.0.0.1:27017/nodejscrash2024").then(() =>
  console.log("MongoDB connected!")
);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("logs.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(8000, () => console.log(`Server Started at port ${PORT}`));
