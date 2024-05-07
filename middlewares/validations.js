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
      .custom(service => {
        const uniqueServices = new Set(service);
        if (uniqueServices.size !== service.length) {
            throw new Error('Duplicate service found in the array.');
        }
        return true;
      }),
      body('service.*')
      .custom(service => {
        if (service !== 'cabelo' && service !== 'barba' && service !== 'sobrancelha') {
            throw new Error('Invalid service: ' + service);
        }
        return true;
      }),
      body('date')
      .notEmpty().withMessage("date is required!")
      .isString().withMessage("date must be a string!")
      .escape().withMessage("date is invalid!")
      .matches(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/).withMessage("Invalid date format!"),
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
        const uniqueHours = new Set(hours);
        if (uniqueHours.size !== hours.length) {
            throw new Error('Duplicate hours found in the array.');
        }
        return true;
      }),
      body('hours.*')
      .custom(hours => {
        const regex = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
          if (!regex.test(hours)) {
              throw new Error('Invalid hour format: ' + hours);
          }

        return true;
      })
    ]

    return definitionValidations
  }

  usersValidations() {
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
      .notEmpty().withMessage("Email is required!")
      .isEmail().withMessage("email is invalid!")
      .isString().withMessage("email must be a string!")
      .escape().withMessage("email is invalid!"),
      body('password')
      .notEmpty().withMessage("Password is required!")
      .isString().withMessage("password must be a string!")
      .escape().withMessage("Password is invalid!")
    ];

    return definitionValidations;
  }

}

module.exports = new Validation;