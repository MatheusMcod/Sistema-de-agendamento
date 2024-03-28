let mongoose = require("mongoose");

const scheduleUser = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  service: String,
  date: String,
  hour: String
});

const schedulesHors = mongoose.model('schedulesHors', scheduleUser);

class Schedule {
  async createSchedule(name, phoneNumber, email, service, date, hour) {
    try{
      const newSchedule = new schedulesHors({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        service: service,
        date: date,
        hour: hour
      });

      await newSchedule.save();
      return true;
    } catch(err) {
      return err;
    }
  }

  async findAllSchedules() {
    try {
      const schedules = await schedulesHors.find();

      return {data: schedules, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }

  async findSchedulesByDate(date) {
    try {
      const schedules = await schedulesHors.find({date: date});

      return {data: schedules, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }

  async findOneScheduleByDateAndAttribute(dateAndAttribute) {
    try {
      const schedules = await schedulesHors.findOne(dateAndAttribute);

      return {data: schedules, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }

}

module.exports = new Schedule;