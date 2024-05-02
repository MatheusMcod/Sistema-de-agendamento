let mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  phoneNumber: String,
  role: String
});

const user = mongoose.model('users', userScheme);


class User {
  async createAdmin(name, email, phoneNumber, password) {
    try{
      const newAdmin = new user({
        name: name,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        role: "Admin"
      });

      await newAdmin.save();
      return true;
    } catch(err) {
      return err;
    }
  }

  async findAdmin() {
    try {
      const resultAdmin = await user.findOne({role: "Admin"});

      if (resultAdmin != null) {
        return {data: resultAdmin, status: true};
      } else {
        return {data: resultAdmin, status: false};
      }
    } catch(err) {
      return {data: err, status: false};
    }
  }
}

module.exports = new User;