const { body } = require('express-validator');

class Validation {
  scheduleValidations() {
    const definitionValidations = [
      body('name')
      .notEmpty().withMessage("Name is required!")
      .isString().withMessage("Name must be a string!")
      .isAlpha().withMessage('Name must contain only alphabetic characters!')
      .escape().withMessage("Name is invalid!"),
      body('phoneNumber')
      .notEmpty().withMessage("Phone number is required!")
      .isString().withMessage("Phone number must be a string!")
      .isNumeric().withMessage('Phone number must contain only numeric characters!')
      .escape().withMessage("Phone number is invalid!"),
      body('email')
      .optional()
      .isEmail().withMessage("email is invalid!")
      .isString().withMessage("email must be a string!")
      .escape().withMessage("email is invalid!"),
      body('service')
      .notEmpty().withMessage("Service is required!")
      .isArray().withMessage("Service must be a array!")
      .escape().withMessage("Service is invalid!"),
      body('date')
      .notEmpty().withMessage("date is required!")
      .isString().withMessage("date must be a string!")
      .escape().withMessage("date is invalid!"),
      body('hour')
      .notEmpty().withMessage("hour is required!")
      .isString().withMessage("hour must be a string!")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("hour is invalid!"),
    ];

    return definitionValidations;
  }

}

module.exports = new Validation;