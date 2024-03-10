var express = require("express");
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");

router.post('/schedule', UserController.createSchedule);

module.exports = router;