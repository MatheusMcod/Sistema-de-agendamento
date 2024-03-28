const mongoose = require("mongoose");
const scheduleModel = require("../models/Schedule.js");

class UserController {

    async RequestCreateSchedule(req, res) {
        const {name, phoneNumber, email, service, date, hour} = req.body;
        const modelResponse = await scheduleModel.createSchedule(name, phoneNumber, email, service, date, hour);

        if(modelResponse) {
          console.log("Successfully saved to database");
          res.status(200).redirect("/");
        } else {
          console.error("Error saving to database: ", err.message);
          res.status(500).redirect("/");
        }
    }

    async RequestFindAllSchedules(req, res) {
        const schedules = await scheduleModel.findAllSchedules();

        if (schedules.status) {
          res.status(200).json(schedules.data);
          console.log("Successfully find to schedules");
        } else {
          res.status(500).send("Unexpected error");
          console.error("Error find to database: ", schedules.data);
        }
    }

    async RequestFindSchedulesByDate(req, res) {
      const date = req.params.date;
      console.log(date)
      const schedules = await scheduleModel.findSchedulesByDate(date);

      if (schedules.status) {
        res.status(200).json(schedules.data);
        console.log("Successfully find to schedules");
      } else {
        res.status(500).send("Unexpected error");
        console.error("Error find to database: ", schedules.data);
      }
    }

    async RequestFindSchedulesByDateAndAttribute(req, res) {
      const dateAndAttribute = req.query;
      const schedules = await scheduleModel.findOneScheduleByDateAndAttribute(dateAndAttribute);

      if (schedules.status) {
        res.status(200).json(schedules.data);
        console.log("Successfully find to schedules");
      } else {
        res.status(500).send("Unexpected error");
        console.error("Error find to database: ", schedules.data);
      }
    }
}

module.exports = new UserController();