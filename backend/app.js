const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // import the cors package

const formRoute = require("./routes/formRoute");

const app = express();
app.use(cors());


mongoose.connect(
  "mongodb+srv://sachinvmn007:vmn007@cluster0.18fdbnr.mongodb.net/testcases?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB database.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/form", formRoute);



module.exports = app;
// module.exports = mongoose;