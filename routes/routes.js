var express = require("express");
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");
var DateController = require("../controllers/DateController");


router.post('/schedule', UserController.createSchedule);
router.post('/date', DateController.createAvailableHours);

module.exports = router;