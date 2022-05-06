const express = require("express");
const router = express.Router();
const { homeData } = require("../data");

router.get("/", async (req, res) => {
  try {
    let { sports } = await homeData.getNflTeams();
    res.render("home", {
      title: "Home",
    });
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
});

module.exports = router;
