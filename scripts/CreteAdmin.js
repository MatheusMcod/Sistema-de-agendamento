const mongoose = require("mongoose");
const userModel = require("../models/User");

class CreateAdmin {
  async requestCreateAdmin() {
    const existingAdmin = await userModel.findAdmin();

    if (existingAdmin.status) {
      return;
    }

    const createAdminResult = await userModel.createUser('admin', 'admin@gmail.com', '', 'admin', 'admin');

    if(createAdminResult === true) {
      console.log("Administrative user created successfully.");
    } else {
      console.error("Error create administrative user: ", createAdminResult);
    }
  }
}

module.exports = new CreateAdmin;