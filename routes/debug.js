const express = require("express");
const router = express.Router();
const { userData, discussionData } = require("../data");
const { ObjectId } = require("mongodb");

router.get("/getpost", async (req, res) => {
  try {
    let resp = await discussionData.getPost("627777d2e6ab3bcfd73d830b");
    res.status(200).json(resp);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/adddisc", async (req, res) => {
  try {
    await discussionData.createDiscussion(
      "6274cbb6cc25fc1c498d3b04",
      "Big Boys Ball Out (YES)"
    );
    res.status(200).send("OK");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
