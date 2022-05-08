const playerRoutes = require("./players");
const newsRoutes = require("./news");
const homeRoutes = require("./home");
const debugRoutes = require("./debug");
const authRoutes = require("./auth");
const profRoutes = require("./profile");
const forumRoutes = require("./forum");

const constructorMethod = (app) => {
  app.use("/", newsRoutes);
  app.use("/", playerRoutes);
  app.use("/", homeRoutes);
  app.use("/home", homeRoutes);
  app.use("/", authRoutes);
  app.use("/", forumRoutes);
  app.use("/", profRoutes);
  app.use("/debug", debugRoutes); //temporary
  app.use("*", (req, res) => {
    res.status(404);
  });
};

module.exports = constructorMethod;
