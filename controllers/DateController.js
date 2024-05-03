const mongoose = require("mongoose");
const dateModel = require("../models/Dates");
const { validationResult } = require('express-validator');

class DateController {

    async requestCreateAvailableHours (req, res) {
        const {date, hours} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.error(({ errors: errors.array() }))
          return res.status(400).redirect("/");
        }

        const modelResponse = await dateModel.createAvailableHours(date, hours);

        if(modelResponse === true) {
          console.log("Successfully saved to database");
          res.status(201).json({status: "true", msg: "Successfully saved to hours"});
        } else {
          console.error("Error saving to database: ", modelResponse.message);
          res.status(500).send("Unexpected error");
        }
    }

    async RequestFindAllRegisteredHours(req, res) {
      const dateHours = await dateModel.findAllRegisteredHours();

      if (dateHours.status === true) {
        res.status(200).json(dateHours.data);
        console.log("Successfully find to hours");
      } else {
        res.status(500).send("Unexpected error");
        console.error("Error find to database: ", dateHours.data.message);
      }
    }

    async RequestFindHorsRegisteredByDate(req, res) {
      const date = req.params.date;
      const hours = await dateModel.findHorsRegisteredByDate(date);

      if (hours.status === true) {
        res.status(200).json(hours.data);
        console.log("Successfully find to hours");
      } else {
        res.status(500).send("Unexpected error");
        console.error("Error find to database: ", hours.data.message);
      }
    }

}

module.exports = new DateController();