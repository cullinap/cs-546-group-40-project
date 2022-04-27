// const userRoutes = require('./user');
const playerRoutes = require('./players')

const constructorMethod = (app) => {
    // app.use("/", userRoutes);
    app.use("/", playerRoutes);
  
    app.use("*", (req, res) => {
      res.status(404).json({ error: "Not Found" });
    });
  };
  
module.exports = constructorMethod;