const bCrypt = require("bcryptjs");
const _ = require("lodash");
const { isString } = require("../validator");

/**
 * @param {Object} res
 * @param {String} status ok | error
 * @param {String} msg Response message
 * @param {Object|Array} payload Array or Object
 * @param {Object} other This can be other object that user wants to add
 */
exports.createResponse = (
  res,
  status,
  msg,
  payload,
  other = undefined,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    status,
    message: msg,
    data: payload,
    ...other,
  });
};

/**
 * @param {Object} res
 * @param {Object} error
 * @param {Object} options
 */
exports.createError = (res, error, options = undefined, statusCode = 400) => {
  if (!options) options = {};
  if (!options.other) options.other = {};

  const message =
    (error && error.message) ||
    (isString(error) && error) ||
    options.message ||
    "Error Occurred";
  const stackTrace = error || message;

  console.error("ERROR:", message, stackTrace);

  res.locals.errorStr = message;

  const other = {
    ...options.other,
    ...(options.returnStackTrace ? { error: error.message } : {}),
  };

  return exports.createResponse(
    res,
    false,
    message,
    other,
    undefined,
    statusCode
  );
};

/**
 * @param {Object} res
 * @param {String} message
 * @param {Object} options
 */
exports.createServiceUnavailableError = (res, message, options = undefined) => {
  if (!options) options = {};
  if (!options.other) options.other = {};

  console.error("Service unavailable error:", message);

  return res.status(503).json({
    status: false,
    message,
    ...options.other,
  });
};

/**
 * @param {Object} res
 * @param {Object} errors
 */
exports.createValidationResponse = (res, errors) => {
  return res.status(400).json({
    status: false,
    message: errors[Object.keys(errors)[0]],
    errors: {
      ...errors,
    },
  });
};

/**
 * @description Generate Hashed password
 * @param {String} password
 */
exports.generateHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

/**
 * @descs Compare encrypted passwords
 * @param {*} userpass
 * @param {*} password
 */
exports.comparePassword = (password, DbPassword) => {
  return bCrypt.compareSync(password, DbPassword);
};

exports.isEmail = (value) => {
  // eslint-disable-next-line max-len
  const myRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = myRegEx.test(value);
  return !!isValid;
};

exports.getUserDataId = (user) => {
  if (user) {
    if (user.data_uid) return user.data_uid;
    return user.id;
  }
};

exports.getDate = (date) => {
  if (date) date = new Date(date);
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
};
