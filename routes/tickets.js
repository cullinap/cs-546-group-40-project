const express = require("express");
const router = express.Router();

router.get("/tickets", async (req, res) => {
  try {
    res.render("tickets", {
      title: "Tickets",
    });
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});


module.exports = router;
