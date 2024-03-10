const mongoose = require("mongoose");
const userScheme = require("../schemes/User.js");

class UserController{

    async createSchedule(req, res){
        const userModel = mongoose.model('userModel', userScheme.CreateUserData);

        const {name, phoneNumber, email, service, date, hour} = req.body;

        try {
          await userModel.save({
            name,
            phoneNumber,
            email,
            service,
            date,
            hour
          });
          res.redirect("/");
        } catch (err) {
          console.error(err);
          console.log("Error saving to database");
          res.redirect("/");
        }
    }

}

module.exports = new UserController();