const playerRoutes = require("./players");
const newsRoutes = require("./news");
const homeRoutes = require("./home");
const debugRoutes = require("./debug");
const authRoutes = require("./auth");
const profRoutes = require("./profile");
const forumRoutes = require("./forum");
const vidRoutes = require("./videos");
const tckRoutes = require("./tickets");

const constructorMethod = (app) => {
  //news
  app.use("/", newsRoutes);
  //players
  app.use("/", playerRoutes);
  //home
  app.use("/", homeRoutes);
  app.use("/home", homeRoutes);
  //auth routse
  app.use("/", authRoutes);
  //forum
  app.use("/", forumRoutes);
  //profile
  app.use("/", profRoutes);
  //videos
  app.use("/clips", vidRoutes);
  app.use("/videos", vidRoutes);
  //tickets
  app.use("/", tckRoutes);
  //debug (remove when submitting)
  app.use("/debug", debugRoutes); //temporary
  app.use("*", (req, res) => {
    res.status(404);
  });
};

module.exports = constructorMethod;
