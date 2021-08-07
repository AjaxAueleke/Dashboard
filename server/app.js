const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dsModel = require("./schema.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DB_URI = "mongodb+srv://admin:admin@cluster0.ewjm1.mongodb.net/DEV";
const port = 5006;
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (error) =>
  console.log(`mongoose error ${error.message}`)
);

app.post("/create", (req, res) => {
  const body = req.body;
  dsModel.create(body, (err, data) => {
    try {
      if (err) {
        throw err;
      } else {
        console.log(data);
        res.send(data);
      }
    } catch (err) {
      console.log("Error", err.message);
    }
  });
});
app.get("/getPost", (req, res) => {
  dsModel.find({}, (err, data) => {
    try {
      if (err) {
        throw err;
      } else {
        res.send(data);
      }
    } catch (err) {
      console.log("ERROR", error.message);
    }
  });
});

app.listen(port, () =>
  console.log(`Your server is running on localhost:${port}`)
);
