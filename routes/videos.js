const express = require("express");
const router = express.Router();

router.get("/matches", async (req, res) => {
  try {
    res.render("matches", {
      title: "Ongoing Matches",
    });
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

router.get("/clips", async (req, res) => {
  try {
    res.render("clips", {
      title: "Recent Clips",
    });
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

module.exports = router;
