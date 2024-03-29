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
      .isArray().withMessage("Service must be a array!"),
      body('service.*')
      .custom(value => {
        if (value !== 'cabelo' && value !== 'barba' && value !== 'sobrancelha') {
            throw new Error('Invalid service: ' + value);
        }
        return true;
      })
      .custom(value => {
        const uniqueServices = new Set(value);
        if (uniqueValue.size !== value.length) {
            throw new Error('Duplicate service found in the array.');
        }
        return true;
      }),
      body('date')
      .notEmpty().withMessage("date is required!")
      .isString().withMessage("date must be a string!")
      .escape().withMessage("date is invalid!")
      .matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/).withMessage("Invalid date format!"),
      body('hour')
      .notEmpty().withMessage("hour is required!")
      .isString().withMessage("hour must be a string!")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("hour is invalid!"),
    ];

    return definitionValidations;
  }

  datesValidations() {
    const definitionValidations = [
      body('date')
      .notEmpty().withMessage("date is required!")
      .isString().withMessage("date must be a string!")
      .escape().withMessage("date is invalid!")
      .matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/).withMessage("Invalid date format!"),
      body('hours')
      .notEmpty().withMessage("hour is required!")
      .isArray().withMessage("hour must be a Array!")
      .custom(hours => {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        for (const hour of hours) {
            if (!regex.test(hour)) {
                throw new Error('Invalid hour format: ' + hour);
            }
        }
        return true;
      })
      .custom(hours => {
        const uniqueHours = new Set(hours);
        if (uniqueHours.size !== hours.length) {
            throw new Error('Duplicate hours found in the array.');
        }
        return true;
      })
    ]

    return definitionValidations
  }

}

module.exports = new Validation;