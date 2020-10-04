const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const users = require("./routes/UserRoute");
const mobiles = require("./routes/MobileRoute");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(users, mobiles);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  mongoose.connect(
    "mongodb://localhost:27017/react_crud",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to database")
  );
});
