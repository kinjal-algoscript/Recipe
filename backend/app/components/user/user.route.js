const express = require('express');
// Init Router
const router = express.Router();
const passport = require('passport');
const PassportErrorHandler = require('../../middleware/passportErrorResponse');
const UserController = require('./user.controller');

/**
 * @route POST api/user/me
 * @description get my profile
 * @returns JSON
 * @access public
 */
router.get(
  '/me',
  [
    passport.authenticate('jwt', { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    UserController.getMyProfile(req, res);
  },
);

module.exports = router;
