const moongose = require("mongoose");

class User {
  CreateUserData(name, phoneNumber, email, service, date, hour) {
    const userDate = new moongose.Schema({
      name: String,
      phoneNumber: String,
      email: String,
      service: String,
      date: Date,
      hour: String
    });

    return userDate;
  }
}

module.exports = new User;