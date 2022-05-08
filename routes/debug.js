const express = require("express");
const router = express.Router();
const { userData, discussionData } = require("../data");
const { ObjectId } = require("mongodb");

router.get("/addpost", async (req, res) => {
  try {
    await discussionData.addPostToDiscussion(
      "627723c63013ee47634ba478",
      "6274cbb6cc25fc1c498d3b04",
      "Big Dogs ball out yo."
    );
    res.status(200).send("OK");
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
