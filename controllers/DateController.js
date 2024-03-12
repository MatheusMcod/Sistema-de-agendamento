const mongoose = require("mongoose");
const dateModel = require("../schemes/Dates.js");

class DateController {

    async createAvailableHours (req, res) {
        const {date, hour} = req.body;

        try {
          const newDate = new dateModel({
            date,
            hour
          });

          newDate.save();
          res.status(201).redirect("/");
          console.log("Successfully saved to database");
        } catch (err) {
          res.status(500).redirect("/");
          console.error("Error saving to database: ", err.message);
        }
    }

}

module.exports = new DateController();