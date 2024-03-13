let mongoose = require("mongoose");

const scheduleDate = new mongoose.Schema({
  date: String,
  hour: [{type: String}]
});

const dateHors = mongoose.model('dateHors', scheduleDate);

class Dates {
  async createAvailableHours(date, hour) {
    try {
      const newDate = new dateHors({
        date: date,
        hour: hour
      });

      await newDate.save();
      return true;
    } catch (err) {
      return err;
    }
  }

  async findAllAvailableHours() {
    try {
      const hors = await dateHors.find();

      return {data: hors, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }
}

module.exports = new Dates;