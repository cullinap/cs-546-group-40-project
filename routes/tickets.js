const express = require("express");
const { tckData } = require("../data");
const router = express.Router();

router.get("/tickets", async (req, res) => {
  try {
    let fb = await tckData.getFootballTickets();
    let bab = await tckData.getBaseballTickets();
    let bb = await tckData.getBasketballTickets();
    res.render("tickets", {
      title: "Tickets",
      fb: fb,
      bab: bab,
      bb: bb,
    });
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

module.exports = router;
