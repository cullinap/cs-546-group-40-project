const express = require("express");
const { tckData } = require("../data");
const router = express.Router();

router.get("/tickets", async (req, res) => {
  try {
    let tm = await tckData.getTicketmaster();
    res.render("tickets", {
      title: "Tickets",
      tm: tm,
    });
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

module.exports = router;
