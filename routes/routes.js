var express = require("express");
var app = express();
var router = express.Router();
var scheduleController = require("../controllers/ScheduleController");
var DateController = require("../controllers/DateController");
var validations = require("../validations/validations")

router.get('/schedule', scheduleController.RequestFindSchedulesByDateAndAttribute)
router.get('/schedule/:date', scheduleController.RequestFindSchedulesByDate)
router.get('/schedules', scheduleController.RequestFindAllSchedules);
router.get('/dates', DateController.RequestFindAllRegisteredHours);
router.get('/dates/:date', DateController.RequestFindHorsRegisteredByDate);
router.post('/schedule', validations.scheduleValidations(), scheduleController.RequestCreateSchedule);
router.post('/date', DateController.requestCreateAvailableHours);

module.exports = router;