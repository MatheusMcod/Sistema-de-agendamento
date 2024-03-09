let moongose = require("mongoose");

class User {
  CreateUserData(name, phoneNumber, email, service, date, hour) {
    let userDate = new moongose.Schema({
      name: String,
      phoneNumber: String,
      email: String,
      service: String,
      date: Date,
      hour: String
    });
  }
}

module.exports = new User;