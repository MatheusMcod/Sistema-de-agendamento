const mongoose = require("mongoose");
const scheduleModel = require("../models/Schedule.js");
const dateModel = require("../models/Dates");
const { validationResult } = require('express-validator');

class UserController {

    async RequestCreateSchedule(req, res) {
        const services = ["cabelo", "barba", "sobrancelha"];
        const {name, phoneNumber, email, service, date} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.error(({ errors: errors.array() }));
          return res.status(400).json({errors: errors.array()});
        }

        const cutoffValueHour = 11;
        const cutoffValueDate = 0;
        const datesAndHours = await dateModel.findHorsRegisteredByDate(date.slice(cutoffValueDate, cutoffValueHour-1));
        const hourSchedules = await scheduleModel.findSchedulesByDate(date);
        const hour = (date.slice(cutoffValueHour));
        const validDatesAndHours = datesAndHours.data.some(item => item.hours.includes(hour));
        if(!validDatesAndHours && (hourSchedules.data.status === false || hourSchedules.data.length != 0)) {
          console.error("Invalid hour");
          return res.status(400).json({status: "false", msg: "Invalid hour"});
        }

        const modelResponse = await scheduleModel.createSchedule(name, phoneNumber, email, service, date);

        if(modelResponse === true) {
          console.log("Successfully saved to database");
          return res.status(201).json({status: "true", msg: "Successfully saved to schedule"});
        } else {
          console.error("Error saving to database: ", modelResponse.message);
          return res.status(500).json({status: "false", msg: "Unexpected error"});
        }
    }

    async RequestFindAllSchedules(req, res) {
        const schedules = await scheduleModel.findAllSchedules();

        if (schedules.status === true) {
          console.log("Successfully find to schedules");
          return res.status(200).json(schedules.data);
        } else {
          console.error("Error find to database: ", schedules.data);
          return res.status(500).json({status: "false", msg: "Unexpected error"});
        }
    }

    async RequestFindSchedulesByDate(req, res) {
      const searchDate = req.params.date;
      if (!isNaN(Date.parse(searchDate.date))) {
        const schedules = await scheduleModel.findSchedulesByDate(searchDate);

        if (schedules.status === true) {
          console.log("Successfully find to schedules");
          return res.status(200).json(schedules.data);
        } else {
          console.error("Error find to database: ", schedules.data);
          return res.status(500).json({status: "false", msg: "Unexpected error"});
        }
      } else {
        console.error("Invalid parameters: ", searchDate.data);
        return res.status(400).json({status: "false", msg: "Invalid parameters"});
      }
    }

    async RequestFindSchedulesByDateAndAttribute(req, res) {
      const dateAndAttribute = req.query;

      if ('date' in dateAndAttribute && 'name' in dateAndAttribute) {
        if (!isNaN(Date.parse(dateAndAttribute.date))) {
          const schedules = await scheduleModel.findOneScheduleByDateAndAttribute(dateAndAttribute);

          if (schedules.status === true) {
            console.log("Successfully found schedule");
            return res.status(200).json(schedules.data);
          } else {
            console.error("Error finding in database: ", schedules.data);
            return res.status(500).json({status: "false", msg: "Unexpected error"});
          }
        } else {
          console.error("Invalid date format: ", dateAndAttribute.data);
          return res.status(400).json({status: "false", msg: "Invalid date format"});
        }
      } else {
        console.error("Invalid query parameters: ", dateAndAttribute.data);
        return res.status(400).json({status: "false", msg: "Invalid query parameters"});
      }
    }

    async RequestDeleteSchedule(req, res) {
      const id = req.params.id;
      const scheduleResponse = await scheduleModel.deleteSchedule(id);

      if (scheduleResponse.status === true) {
        if (scheduleResponse.data.deletedCount != 0) {
          console.log("Successful delete schedule");
          return res.status(200).json({status: "true", msg: "Successful delete schedule"});
        } else {
          console.log("No schedules found");
          return res.status(200).json({status: "true", msg: "No schedules found"});
        }
      } else {
        console.error("Error delete schedule: ", scheduleResponse.data.message);
        return res.status(500).json({status: "false", msg: "Unexpected error"});
      }
  }
}

module.exports = new UserController;