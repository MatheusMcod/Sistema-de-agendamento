const mongoose = require("mongoose");

const userDate = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  service: String,
  date: Date,
  hour: String
});

const userModel = mongoose.model('userModel', userDate);

module.exports = userModel;