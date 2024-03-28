let mongoose = require("mongoose");

const scheduleDate = new mongoose.Schema({
  date: String,
  hours: [String]
});

const dateHours = mongoose.model('dateHours', scheduleDate);

class Dates {
  async createAvailableHours(date, hours) {
    try {
      const newDate = new dateHours({
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
      const dateAndHours = await dateHours.find();

      return {data: dateAndHours, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }

  async findHorsRegisteredByDate(date) {
    try {
      const hours = await dateHours.find({date: date});

      return {data: hours, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }
}

module.exports = new Dates;