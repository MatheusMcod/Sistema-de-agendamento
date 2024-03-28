const mongoose = require("mongoose");
const dateModel = require("../models/Dates");

class DateController {

    async requestCreateAvailableHours (req, res) {
        const {date, hours} = req.body;
        const modelResponse = await dateModel.createAvailableHours(date, hours);

        if(modelResponse) {
          console.log("Successfully saved to database");
          res.status(201).redirect("/");
        } else {
          console.error("Error saving to database: ", modelResponse.message);
          res.status(500).redirect("/");
        }
    }

    async RequestFindAllRegisteredHours(req, res) {
      const dateHours = await dateModel.findAllRegisteredHours();

      if (dateHours.status) {
        res.status(200).json(dateHours.data);
        console.log("Successfully find to schedules");
      } else {
        res.status(500).send("Unexpected error");
        console.error("Error find to database: ", dateHours.data.message);
      }
    }

    async RequestFindHorsRegisteredByDate(req, res) {
      const date = req.params.date;
      const hours = await dateModel.findHorsRegisteredByDate(date);

      if (hours.status) {
        res.status(200).json(hours.data);
        console.log("Successfully find to schedules");
      } else {
        res.status(500).send("Unexpected error");
        console.error("Error find to database: ", hours.data.message);
      }
    }

}

module.exports = new DateController();