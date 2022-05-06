const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("home", {
      title: "Home",
    });
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
});

module.exports = router;
