let express = require("express");
let app = express();
let router = express.Router();
let scheduleController = require("../controllers/ScheduleController");
let DateController = require("../controllers/DateController");
let UserController = require("../controllers/UserController");
let Validations = require("../middlewares/validations");

router.get('/schedule', scheduleController.RequestFindSchedulesByDateAndAttribute);
router.get('/schedule/:date', scheduleController.RequestFindSchedulesByDate);
router.get('/schedules', scheduleController.RequestFindAllSchedules);
router.get('/dates', DateController.RequestFindAllRegisteredHours);
router.get('/dates/:date', DateController.RequestFindHorsRegisteredByDate);
router.get('/users', UserController.requestFindAllUsers);
router.post('/schedule', Validations.scheduleValidations(), scheduleController.RequestCreateSchedule);
router.post('/date', Validations.datesValidations(), DateController.requestCreateAvailableHours);
router.post('/register', Validations.usersValidations(), UserController.requestCreateUser);
router.post('/register/employee', Validations.usersValidations(), UserController.requestCreateEmployeeUser);
router.delete('/schedule/:id', scheduleController.RequestDeleteSchedule);
router.delete('/date/:id', DateController.RequestDeleteRegisteredHours);


module.exports = router;