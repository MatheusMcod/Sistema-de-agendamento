let mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  name: String,
  password: {type: String, unique: true},
  email: {type: String, unique: true},
  phoneNumber: {type: String, unique: true},
  role: String
});

const user = mongoose.model('users', userScheme);


class User {
  async createUser(name, email, phoneNumber, password, role) {
    try{
      const newUser = new user({
        name: name,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        role: role
      });

      await newUser.save();
      return true;
    } catch(err) {
      return err;
    }
  }

  async findAdmin() {
    try {
      const resultAdmin = await user.findOne({role: "admin"});

      if (resultAdmin != null) {
        return {data: resultAdmin, status: true};
      } else {
        return {data: resultAdmin, status: false};
      }
    } catch(err) {
      return {data: err, status: false};
    }
  }

  async findAllUsers() {
    try {
      const resultUsers = await user.find().select('name email phoneNumber role');

      return {data: resultUsers, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }

  async findUserByEmail(email) {
    try {
      const resultUsers = await user.findOne({email: email});

      if (resultUsers != null) {
        return {data: resultUsers, status: true};
      } else {
        return {data: resultUsers, status: false};
      }
    } catch(err) {
      return {data: err, status: false};
    }
  }

  async findUserByPhoneNumber(phoneNumber) {
    try {
      const resultUsers = await user.findOne({phoneNumber: phoneNumber});

      if (resultUsers != null) {
        return {data: resultUsers, status: true};
      } else {
        return {data: resultUsers, status: false};
      }
    } catch(err) {
      return {data: err, status: false};
    }
  }

  async findUserByPassword(password) {
    try {
      const resultUsers = await user.findOne({password: password});

      if (resultUsers != null) {
        return {data: resultUsers, status: true};
      } else {
        return {data: resultUsers, status: false};
      }
    } catch(err) {
      return {data: err, status: false};
    }
  }
}

module.exports = new User;