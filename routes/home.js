const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("home", {
      title: "Fantasy Sports 🏈⚾🏀",
    });
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

module.exports = router;
