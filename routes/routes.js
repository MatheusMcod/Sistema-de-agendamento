let express = require("express");
let app = express();
let router = express.Router();
let scheduleController = require("../controllers/ScheduleController");
let DateController = require("../controllers/DateController");
let UserController = require("../controllers/UserController")
let validations = require("../middlewares/validations");

router.get('/schedule', scheduleController.RequestFindSchedulesByDateAndAttribute)
router.get('/schedule/:date', scheduleController.RequestFindSchedulesByDate)
router.get('/schedules', scheduleController.RequestFindAllSchedules);
router.get('/dates', DateController.RequestFindAllRegisteredHours);
router.get('/dates/:date', DateController.RequestFindHorsRegisteredByDate);
router.get('/users', UserController.requestFindAllUsers)
router.post('/schedule', validations.scheduleValidations(), scheduleController.RequestCreateSchedule);
router.post('/date', validations.datesValidations(), DateController.requestCreateAvailableHours);
router.post('/register', UserController.requestCreateUser)
router.post('/register/employee', UserController.requestCreateEmployeeUser)


module.exports = router;