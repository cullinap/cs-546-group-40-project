const express = require("express");
const router = express.Router();
const { homeData } = require("../data");

router.get("/posts", async (req, res) => {
  try {
    res.render("somedata", { title: "A test!" });
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
});

router.get("/apidata", async (req, res) => {
  try {
    let playerData = await homeData.getNflPlayerData();
    
    res.json(playerData)
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
});

module.exports = router;
