const { createResponse, createError } = require('./../../utils/helpers');

class UserController {
  /**
   * @description get current user profile
   */
  async getMyProfile(req, res) {
    try {
      const { user } = req;
      if (user) {
        createResponse(res, true, 'My Profile', user.toJSON());
      } else {
        createError(res, { message: 'User not found' });
      }
    } catch (e) {
      createError(res, e);
    }
  }
}

const userController = new UserController();
module.exports = userController;
