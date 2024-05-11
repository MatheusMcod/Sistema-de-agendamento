const mongoose = require("mongoose");
const dateModel = require("../models/Dates");
const scheduleModel = require("../models/Schedule")
const { validationResult } = require('express-validator');

class DateController {
  async requestCreateAvailableHours (req, res) {
      const {date, hours} = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error(({ errors: errors.array() }))
        return res.status(400).json({errors: errors.array()});
      }

      const modelResponse = await dateModel.createAvailableHours(date, hours);

      if(modelResponse === true) {
        console.log("Successfully saved to database");
        return res.status(201).json({status: "true", msg: "Successfully saved to hours"});
      } else {
        console.error("Error saving to database: ", modelResponse.message);
        return res.status(500).json({status: "false", msg: "Unexpected error"});
      }
  }

  async RequestFindAllRegisteredHours(req, res) {
    const dateHours = await dateModel.findAllRegisteredHours();

    if (dateHours.status === true) {
      console.log("Successfully find to hours");
      return res.status(200).json(dateHours.data);
    } else {
      console.error("Error find to database: ", dateHours.data.message);
      return res.status(500).json({status: "false", msg: "Unexpected error"});
    }
  }

  async RequestFindHorsRegisteredByDate(req, res) {
    const date = req.params.date;
    const hours = await dateModel.findHorsRegisteredByDate(date);

    if (hours.status === true) {
      console.log("Successfully find to hours");
      return res.status(200).json(hours.data);
    } else {
      console.error("Error find to database: ", hours.data.message);
      return res.status(500).json({status: "false", msg: "Unexpected error"});
    }
  }

  async RequestDeleteRegisteredHours(req, res) {
    try {
        const id = req.params.id;

        const hours = await dateModel.findHoursRegisteredById(id)
        if (!hours.status) {
            throw new Error("Error finding registered hours");
        }

        const responseDeleteSchedules = await scheduleModel.deleteSchedules(hours.data.hours, hours.data.date);
        if (!responseDeleteSchedules.status) {
            throw new Error("Error deleting schedules");
        }

        const responseDeleteHours = await dateModel.deleteRegisteredHours(hours.data._id);
        if (!responseDeleteHours.status) {
            throw new Error("Error deleting registered hours");
        }

        console.log("Successful delete");
        return res.status(200).json(responseDeleteHours.data);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, msg: error.message });
    }
  }
}

module.exports = new DateController;