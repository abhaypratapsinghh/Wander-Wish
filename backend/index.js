const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const mainRoutes = require("./routes/index")

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1", mainRoutes);

const port = 3001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch((err) =>
    console.log(`error occured while connecting to port ${port}`)
  );
