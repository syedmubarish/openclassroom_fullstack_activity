const express = require("express");
const path = require("node:path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const stuffRouter = require("./routes/stuff");
const userRouter = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://mubarish007:cBCQI218bwoEHqir@cluster0.o0g4mt8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Successfully connected to mongoDB Atlas");
  })
  .catch((error) => {
    console.log("Connection failed");
    console.log(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/stuff", stuffRouter);

app.use("/api/auth", userRouter);

module.exports = app;
