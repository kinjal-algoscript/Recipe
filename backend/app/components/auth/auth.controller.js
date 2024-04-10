const { createError, createResponse } = require("../../utils/helpers");
const AuthService = require("../../services/authService");

class AuthController {
    /**
     * @description create new user
     */
  async create(req, res) {
    try {
      const data = await AuthService.addNewUser(req.body);
      if (data) {
        createResponse(res, true, "Signup successful", data);
      } else {
        createError(res, { message: 'Unable to create new user, please try again' });
      }
    } catch (err) {
        createError(res, {
          message: err.message || "Unable to create new user, Please try again",
        });
    }
  }
  /**
   * @description Sign in with email and password
  */
  async login(req, res) {
    try {
      const data = await AuthService.UserLogin(req.body);
      if (data) {
        createResponse(res, true, "Login success", data);
      } else {
        createError(res, {}, { message: "Invalid Credentials" });
      }
    } catch (err) {
      createError(res, {
        message: err.message,
      });
    }
  }
}

const authController = new AuthController();
module.exports = authController;
