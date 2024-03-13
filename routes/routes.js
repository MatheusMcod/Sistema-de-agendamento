var express = require("express");
var app = express();
var router = express.Router();
var schedulleController = require("../controllers/ScheduleController");
var DateController = require("../controllers/DateController");

router.get('/schedules', schedulleController.RequestFindAllSchedules);
router.get('/dates', DateController.RequestFindAllAvailableHours);
router.post('/schedule', schedulleController.RequestCreateSchedule);
router.post('/date', DateController.requestCreateAvailableHours);

module.exports = router;