/**
 * Init All routes here
 */
 const auth = require("../components/auth/auth.route");
 const user = require("../components/user/user.route");
 const dish = require("../components/dish/dish.route");
 const media = require("../components/uploadImages/uploadImage.route");
 
 module.exports = (app) => {
   app.use("/api/auth", auth);
   app.use("/api/user", user);
   app.use("/api/dish", dish);
   app.use("/api/media", media);
 };
 