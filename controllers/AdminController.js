const mongoose = require("mongoose");
const adminModel = require("../models/Admin");

class AdminController {
  async RequestCreateAdmin(req, res) {
    const existingAdmin = await adminModel.findAdmin();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Administrative user already exists.' });
    }

    const createAdminResult = await adminModel.createAdmin('admin', 'admin')

    if(createAdminResult) {
      console.log("Administrative user created successfully.");
      res.status(200).send("Successful");
    } else {
      res.status(500).send("Unexpected error");
      console.error("Error create administrative user: ", createAdminResult.data);
    }
  }
}

module.exports = new AdminController;
