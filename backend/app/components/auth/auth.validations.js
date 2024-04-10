const { createValidationResponse } = require("../../utils/helpers");
const { isEmpty, isPassword } = require("../../utils/validator");

class AuthValidator {
  create(req, res, next) {
    const errors = {};
    const { firstName, lastName, email, password } = req.body;

    if (isEmpty(firstName)) {
      errors.firstName = "FirstName is required";
    }
    if (isEmpty(lastName)) {
      errors.lastName = "LastName is required";
    }

    if (isEmpty(email)) {
      errors.email = "Email is required";
    }
    if (isEmpty(password)) {
      errors.password = "Password is required";
    }
    if (!isPassword(password)) {
      errors.password =
        "Password must be at least of 8 characters, including at least one uppercase, lowercase, and special character.";
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }

  login(req, res, next) {
    const errors = {};
    const { username, password } = req.body;

    if (isEmpty(username)) {
      errors.username = "username is required";
    }

    if (isEmpty(password)) {
      errors.password = "password is required";
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
}

const authValidationObj = new AuthValidator();
module.exports = authValidationObj;
