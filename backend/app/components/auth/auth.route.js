const express = require("express");
const AuthController = require('./auth.controller');
const AuthValidations = require('./auth.validations');
const router = express.Router();
/**
 * @route POST api/auth/register
 * @description Sign up user
 * @returns JSON
 * @access public
 */
router.post("/register", AuthValidations.create,  (req, res, next) => {
    AuthController.create(req, res, next);
});

/**
 * @route POST api/auth/signin
 * @description Sign in with phone and password
 * @returns JSON
 * @access public
 */
router.post("/login", AuthValidations.login, (req, res) => {
  AuthController.login(req, res);
});
module.exports = router;
