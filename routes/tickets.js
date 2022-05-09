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
    //really hacky but this is literally just because ticketmaster is really low load server and we are (apparently) sending too many reqs (429)
    res.redirect("/tickets")
    return;
  }
});

module.exports = router;
