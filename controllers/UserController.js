const mongoose = require("mongoose");
const userModel = require("../models/User");
const { validationResult } = require('express-validator');

class UserController {
  async requestCreateEmployeeUser (req, res) {
    const {name, email, phoneNumber, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(({ errors: errors.array() }))
      return res.status(400).json({errors: errors.array()});
    }

    const findUserByEmailResponse = await userModel.findUserByEmail(email);
    if (findUserByEmailResponse.status === true) {
      console.log("Email already exists");
      return res.status(400).json({status: "false", msg: "Email already exists"});
    }

    const findUserByPhoneNumberResponse = await userModel.findUserByPhoneNumber(phoneNumber);
    if (findUserByPhoneNumberResponse.status === true) {
      console.log("Phone Number already exists");
      return res.status(400).json({status: "false", msg: "Phone Number already exists"});
    }

    const findUserByPasswordResponse = await userModel.findUserByPassword(password);
    if(findUserByPasswordResponse.status === true) {
      console.log("Password already exists");
      return res.status(400).json({status: "false", msg: "Password already exists"});
    }

    const registerResponse = await userModel.createUser(name, email, phoneNumber, password, "employee");

    if(registerResponse === true) {
      console.log("Successfully saved to database");
      return res.status(201).json({status: "true", msg: "Successfully registration"});
    } else {
      console.error("Error saving to database: ", registerResponse.message);
      return res.status(500).send("Unexpected error");
    }
  }

  async requestCreateUser (req, res) {
    const {name, email, phoneNumber, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(({ errors: errors.array() }))
      return res.status(400).redirect("/");
    }

    const findUserByEmailResponse = await userModel.findUserByEmail(email)
    if (findUserByEmailResponse.status === true) {
      console.log("Email already exists");
      return res.status(400).json({status: "false", msg: "Email already exists"});
    }

    const findUserByPhoneNumberResponse = await userModel.findUserByPhoneNumber(phoneNumber);
    if (findUserByPhoneNumberResponse.status === true) {
      console.log("Phone Number already exists");
      return res.status(400).json({status: "false", msg: "Phone Number already exists"});
    }


    const findUserByPasswordResponse = await userModel.findUserByPassword(password)
    console.log(findUserByPasswordResponse)
    if(findUserByPasswordResponse.status === true) {
      console.log("Password already exists");
      return res.status(400).json({status: "false", msg: "Password already exists"});
    }

    const registerResponse = await userModel.createUser(name, email, phoneNumber, password, "user")

    if(registerResponse === true) {
      console.log("Successfully saved to database");
      return res.status(201).json({status: "true", msg: "Successfully registration"});
    } else {
      console.error("Error saving to database: ", registerResponse.message);
      return res.status(500).send("Unexpected error");
    }
  }

  async requestFindAllUsers(req, res) {
    const users = await userModel.findAllUsers();

    if (users.status === true) {
      console.log("Successfully find to schedules");
      return res.status(200).json(users.data);
    } else {
      console.error("Error find to database: ", users.data);
      return res.status(500).send("Unexpected error");
    }
  }

  async requestDeleteUser(req, res) {
    const id = req.params.id;
    const userResponse = await userModel.deleteUser(id);

    if (userResponse.status === true) {
      console.log("Successfully delete");
      return res.status(200).json({status: "true", msg: "Successfully delete"});
    } else {
      console.error("Error delete: ", userResponse.data.message);
      return res.status(500).send("Unexpected error");
    }
  }
}

module.exports = new UserController;
