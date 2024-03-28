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
      const dateHors = await dateModel.findAllRegisteredHours();

      if (dateHors.status) {
        res.status(200).json(dateHors.data);
        console.log("Successfully find to schedules");
      } else {
        res.status(500).send("Unexpected error");
        console.error("Error find to database: ", dateHors.data.message);
      }
    }

    async RequestFindHorsRegisteredByDate(req, res) {
      const date = req.params.date;
      const hors = await dateModel.findHorsRegisteredByDate(date);

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