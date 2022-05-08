const express = require("express");
const { vidData } = require("../data");
const router = express.Router();

router.get("/", async (req, res) => {
  let espn = await vidData.getEspnClips();
  let nbc = await vidData.getNbcClips();
  try {
    res.render("clips", {
      title: "Recent Clips",
      espn: espn,
      nbc: nbc,
    });
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

module.exports = router;
