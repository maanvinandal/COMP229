const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  position: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("references", referenceSchema);
