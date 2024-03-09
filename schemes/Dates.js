let moongose = require("mongoose");

class Dates {
  CreatScheduleDate(date, hour) {
    let scheduleDate = new moongose.Schema({
      date: Date,
      hour: {
        String
      }
    });
  };
}

module.exports = new User;