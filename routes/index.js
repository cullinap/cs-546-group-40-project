//const userRoutes = require('./user');
const playerRoutes = require("./players");
const newsRoutes = require("./news");
const homeRoutes = require("./home");
const debugRoutes = require("./debug");

const constructorMethod = (app) => {
  //app.use("/", userRoutes);
  app.use("/latestnews", newsRoutes);
  app.use("/", playerRoutes);
  app.use("/debug", debugRoutes); //temporary
  app.use("/", homeRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not Found" });
  });
};

module.exports = constructorMethod;
