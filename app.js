require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

const port = process.env.PORT;
const connStr = process.env.DBPATH;

// Connect to MongoDB using Mongoose
mongoose
  .connect(connStr)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(cors());
app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
