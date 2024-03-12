const mongoose = require("mongoose");
const userModel = require("../schemes/User.js");

class UserController{

    async createSchedule(req, res){
        const {name, phoneNumber, email, service, date, hour} = req.body;

        try {
          const newUser = new userModel({
            name,
            phoneNumber,
            email,
            service,
            date,
            hour
          });

          await newUser.save();
          res.status(201).redirect("/");
          console.log("Successfully saved to database");
        } catch (err) {
          res.status(500).redirect("/");
          console.error("Error saving to database: ", err.message);
        }
    }

}

module.exports = new UserController();