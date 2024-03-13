const mongoose = require("mongoose");
const dateModel = require("../models/Dates");

class DateController {

    async requestCreateAvailableHours (req, res) {
        const {date, hour} = req.body;
        const modelResponse = await dateModel.createAvailableHours(date, hour);

        if(modelResponse) {
          console.log("Successfully saved to database");
          res.status(201).redirect("/");
        } else {
          console.error("Error saving to database: ", modelResponse.message);
          res.status(500).redirect("/");
        }
    }

    async RequestFindAllAvailableHours(req, res) {
      const hors = await dateModel.findAllAvailableHours();

      if (hors.status) {
        res.status(200).json(hors.data);
        console.log("Successfully find to schedules");
      } else {
        res.status(500).send("Unexpected error");
        console.error("Error find to database: ", hors.data.message);
      }
  }
}

module.exports = new DateController();