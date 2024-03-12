let mongoose = require("mongoose");

const scheduleDate = new mongoose.Schema({
  date: Date,
  hour: [{type: String}]
});

const dateModel = mongoose.model('dateModel', scheduleDate);

module.exports = dateModel;