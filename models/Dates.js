let mongoose = require("mongoose");

const scheduleDate = new mongoose.Schema({
  date: String,
  hours: [String]
});

const dateHors = mongoose.model('dateHors', scheduleDate);

class Dates {
  async createAvailableHours(date, hours) {
    try {
      const newDate = new dateHors({
        date: date,
        hours: hours
      });

      await newDate.save();
      return true;
    } catch (err) {
      return err;
    }
  }

  async findAllRegisteredHours() {
    try {
      const dateHors = await dateHors.find();

      return {data: dateHors, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }

  async findHorsRegisteredByDate(date) {
    try {
      const hors = await dateHors.find({date: date});

      return {data: hors, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }
}

module.exports = new Dates;