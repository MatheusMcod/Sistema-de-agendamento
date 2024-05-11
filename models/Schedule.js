let mongoose = require("mongoose");
let { ObjectId } = require('mongodb');

const scheduleUser = new mongoose.Schema({
  name: String,
  phoneNumber: {type: String, unique: true},
  email: {type: String, unique: true},
  service: [String],
  date: Date,
});

const schedulesHors = mongoose.model('schedulesHors', scheduleUser);

class Schedule {
  async createSchedule(name, phoneNumber, email, service, date) {
    try{
      const newSchedule = new schedulesHors({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        service: service,
        date: new Date(date)
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
      const dateFind = new Date(date)
      const schedules = await schedulesHors.find({date: dateFind});

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

  async deleteSchedules(hors, date) {
    try {
      const horsAndDate = hors.map(hor => date + 'T' + hor)

      const schedules = await schedulesHors.deleteMany({date: {$in: horsAndDate}});

      return {data: schedules, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }

  async deleteSchedule(id) {
    try {
      const objectId = ObjectId.createFromHexString(id);
      const schedules = await schedulesHors.deleteOne(objectId);

      return {data: schedules, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }

}

module.exports = new Schedule;