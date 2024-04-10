const isJSON = require("validator/lib/isJSON");

/**
 * @description Check if variable is undefined or not
 * @param {*} str
 */
exports.isEmpty = (value) => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * @description Check if id is valid mongodb id
 * @param {*} str
 */
exports.isValidId = (id) => {
  if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
    return true;
  } else {
    return false;
  }
};

/**
 * @desc Checks for valid email
 * @param {String} value // Accepts string
 */
exports.isEmail = (value) => {
  var email = value;
  var myRegEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = myRegEx.test(email);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

/**
 * @desc Checks for valid array
 * @param {*} value
 */
exports.isArray = (value) => {
  if (typeof value === "string") {
    const replaced = value.replace(/'/g, '"');
    if (!isJSON(replaced)) {
      return false;
    } else {
      const parsed = JSON.parse(replaced);
      if (parsed.constructor === Array) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (value.constructor === Array) {
      return true;
    } else {
      return false;
    }
  }
};

/**
 * @description Is Valid Date
 * @param {String} d
 */
exports.isValidDate = (d) => {
  var date = d ? new Date(d) : undefined;
  var myRegex = /Invalid|NaN/;
  return !myRegex.test(date);
};

/**
 * @description Check if valid string
 * @param {String} value
 */
exports.isString = (value) => {
  return typeof value === "string" || value instanceof String;
};

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
exports.isNumber = (value) => {
  var number = value;
  var myRegEx = /^(\s*[0-9]+\s*)+$/;
  var isValid = myRegEx.test(number);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

/**
 * @desc Checks if given value is Boolean
 * @param {*} value // Accepts string
 */
exports.isBoolean = (value) => {
  if (typeof value === "boolean") {
    return true;
  } else {
    return false;
  }
};

exports.isPassword = (value) => {
  var myRegEx =
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%^&*()+=-\?;,.\/{}|\":<>\[\]\\\' ~_-]).{8,}/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
};
