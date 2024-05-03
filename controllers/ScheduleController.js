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
          console.error(({ errors: errors.array() }))
          return res.status(400).redirect("/");
        }

        const cutoffValueHour = 11
        const cutoffValueDate = 0
        const datesAndHours = await dateModel.findHorsRegisteredByDate(date.slice(cutoffValueDate, cutoffValueHour-1));
        const hour = (date.slice(cutoffValueHour))
        const validDatesAndHours = datesAndHours.data.some(item => item.hours.includes(hour));
        if(!validDatesAndHours) {
          console.error("Invalid hour!");
          return res.status(400).redirect("/");
        }

        const modelResponse = await scheduleModel.createSchedule(name, phoneNumber, email, service, date);


        if(modelResponse === true) {
          console.log("Successfully saved to database");
          res.status(201).json({status: "true", msg: "Successfully saved to schedule"});
        } else {
          console.error("Error saving to database: ", modelResponse.message);
          res.status(500).redirect("/");
        }
    }

    async RequestFindAllSchedules(req, res) {
        const schedules = await scheduleModel.findAllSchedules();

        if (schedules.status === true) {
          res.status(200).json(schedules.data);
          console.log("Successfully find to schedules");
        } else {
          res.status(500).send("Unexpected error");
          console.error("Error find to database: ", schedules.data);
        }
    }

    async RequestFindSchedulesByDate(req, res) {
      const searchDate = req.params.date;
      if (!isNaN(Date.parse(searchDate.date))) {
        const schedules = await scheduleModel.findSchedulesByDate(searchDate);

        if (schedules.status === true) {
          res.status(200).json(schedules.data);
          console.log("Successfully find to schedules");
        } else {
          res.status(500).send("Unexpected error");
          console.error("Error find to database: ", schedules.data);
        }
      } else {
        res.status(400).send("Invalid parameters");
        console.error("Invalid parameters: ", searchDate.data);
      }
    }

    async RequestFindSchedulesByDateAndAttribute(req, res) {
      const dateAndAttribute = req.query;

      if ('date' in dateAndAttribute && 'name' in dateAndAttribute) {
        if (!isNaN(Date.parse(dateAndAttribute.date))) {
          const schedules = await scheduleModel.findOneScheduleByDateAndAttribute(dateAndAttribute);

          if (schedules.status === true) {
            res.status(200).json(schedules.data);
            console.log("Successfully found schedule");
          } else {
            res.status(500).send("Unexpected error");
            console.error("Error finding in database: ", schedules.data);
          }
        } else {
          res.status(400).send("Invalid date format");
          console.error("Invalid date format: ", dateAndAttribute.data);
        }
      } else {
        res.status(400).send("Invalid query parameters");
        console.error("Invalid query parameters: ", dateAndAttribute.data);
      }
    }
}

module.exports = new UserController;