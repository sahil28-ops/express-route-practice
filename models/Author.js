const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
});

module.exports = mongoose.model("Author", authorSchema);
