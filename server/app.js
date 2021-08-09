const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dsModel = require("./schema.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin : "*",
  methods : ['GET', 'POST', 'PUT']
}));  
const DB_URI = "mongodb+srv://ahmed:admin@cluster0.uj1ij.mongodb.net/crudnode?retryWrites=true&w=majority/";
const port = 8080;
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
  console.log(body);
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
