const express = require("express");
const router = express.Router();
const { userData, discussionData } = require("../data");
const { ObjectId } = require("mongodb");

router.get("/addpost", async (req, res) => {
  await userData.removePost("email", "6274cfa9d7edd9e816510c2e");
  res.status(200).send("Inserted");
});

router.get("/adddisc", async (req, res) => {
  try {
    await discussionData.removeDiscussion(
      "6274cbb6cc25fc1c498d3b04",
      "6274edd02049da7a3338100a"
    );
    res.status(200).send("Inserted");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
