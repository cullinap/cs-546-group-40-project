const express = require("express");
const router = express.Router();
const { userData, discussionData } = require("../data");
const { ObjectId } = require("mongodb");

router.get("/addpost", async (req, res) => {
  await userData.removePost("email", "6274cfa9d7edd9e816510c2e");
  res.status(200).send("Inserted");
});

router.get("/adddisc", async (req, res) => {
  await discussionData.createDiscussion("bigboys@gmail.com", "The Awesine Funny")
  res.status(200).send("Inserted");
});

module.exports = router;
