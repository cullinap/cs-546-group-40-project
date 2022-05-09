const playerRoutes = require("./players");
const newsRoutes = require("./news");
const homeRoutes = require("./home");
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
  app.use("/matches", vidRoutes);
  //tickets
  app.use("/", tckRoutes);
  app.use("*", (req, res) => {
    res.status(404);
  });
};

module.exports = constructorMethod;
