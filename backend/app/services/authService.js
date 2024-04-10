const User = require("../models/auth.model");
const filteredBody = require("../utils/filteredBody");
const constants = require("../config/constants");

class AuthService {
    /**
     * @description Add new User
     * @param {Object} obj
     */
    addNewUser(obj, isFromAuto = false) {
      return new Promise(async (resolve, reject) => {
        try {
          const body = filteredBody(obj, constants.WHITELIST.user.register);
          body.email = String(body.email).toLowerCase();
          const existingUser = await User.findOne(
            {
              $or: [
                {
                  email: body.email,
                },
              ],
            })
  
            // If user is not unique, return error
            if (existingUser) {
              if (isFromAuto) resolve(existingUser.toAuthJSON());
              else
              reject({
                  message: 'That email is already in use.',
              });
              return;
            }

            // If username is unique and password was provided, submit account
            const user = new User({
            ...body,
            extra1: body.password,
            normalized_email: String(body.email).toUpperCase(),
            });

            const item = await user.save();
            resolve(item.toAuthJSON());
        } catch (e) {
          reject(e);
        }
      });
    }

  async UserLogin(payload) {
    try {
      const { username, password } = payload;
      const normalized_username = String(username)
      .toUpperCase()
      .trim();
      const user = await User.findOne({ 
        $or: [{ email: username }, { normalized_email: normalized_username }],
      });
      if (!user) {
        throw Error(
          "Username or password is incorrect. Please check credentials and try again."
        );
      }
        if (user && user.authenticateUser(password)) {
            return user.toAuthJSON();
        }
      return null;
    } catch (err) {
      throw err;
    }
  }
}

const authService = new AuthService();
module.exports = authService;
