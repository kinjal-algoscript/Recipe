module.exports = {
    // Admin Emails
    ADMIN_EMAILS: [""],
    WHITELIST: {
      user: {
        register: [
          "firstName",
          "lastName",
          "email",
          "profileImage",
          "password",
        ],
        updateEmail: ["email"],
        updatePassword: ["password"],
      },
    },
  };
  