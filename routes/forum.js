const express = require("express");
const router = express.Router();
const { discussionData, userData } = require("../data");
const { ObjectId } = require("mongodb");

router.get("/forum", async (req, res) => {
  try {
    res.render("forum", {
      title: "Fantasy Forum",
    });
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

router.post("/forum/creatediscussion", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  let uid = req.session.user.uid;
  if (!uid) {
    res.status(400).send("uid is a required field");
    return;
  }
  if (typeof uid != "string") {
    res.status(400).send("uid must be a string");
    return;
  }
  uid = uid.trim();
  if (!ObjectId.isValid(uid)) {
    res.status(400).send("uid is not a valid id");
    return;
  }
  let { topic } = req.body;
  if (!topic) {
    res.status(400).send("topic is a required field");
    return;
  }
  if (typeof topic != "string") {
    res.status(400).send("topic must be a string");
    return;
  }
  topic = topic.trim();
  try {
    let response = await discussionData.createDiscussion(uid, topic);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(500).send("Failed to create discussion.");
    }
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/forum/addpost", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  let uid = req.session.user.uid;
  if (!uid) {
    res.status(400).send("uid is a required field");
    return;
  }
  if (typeof uid != "string") {
    res.status(400).send("uid must be a string");
    return;
  }
  uid = uid.trim();
  if (!ObjectId.isValid(uid)) {
    res.status(400).send("uid is not a valid id");
    return;
  }
  let { discussionId, postContent } = req.body;
  if (!discussionId) {
    res.status(400).send("discussionId is a required field");
    return;
  }
  if (typeof discussionId != "string") {
    res.status(400).send("discussionId must be a string");
    return;
  }
  discussionId = discussionId.trim();
  if (!ObjectId.isValid(discussionId)) {
    res.status(400).send("discussionId is not a valid id");
    return;
  }
  if (!postContent) {
    res.status(400).send("postContent is a required field");
    return;
  }
  if (typeof postContent != "string") {
    res.status(400).send("postContent must be a string");
    return;
  }
  postContent = postContent.trim();
  try {
    let response = await discussionData.addPostToDiscussion(
      discussionId,
      uid,
      postContent
    );
    await userData.addPost(uid, response.toString());
    if (response) {
      res.status(200).send("Successfully created post.");
    } else {
      res.status(500).send("Failed to create post.");
    }
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/forum/getdiscussions", async (req, res) => {
  try {
    let response = await discussionData.getAllDiscussions();
    if (response) {
      for (let i = 0; i < response.length; i++) {
        let resUserData = await userData.getUserData(
          response[i].ownerId.toString()
        );
        response[i].username = resUserData.username;
        response[i].pfp = resUserData.pfp;
      }
      res.status(200).json(response);
    } else {
      res.status(500).send("Failed to retrieve discussions.");
    }
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/forum/discussion/:id", async (req, res) => {
  let discussionId = req.params.id;
  if (!discussionId) {
    res.status(400).send("discussionId is a required field");
    return;
  }
  if (typeof discussionId != "string") {
    res.status(400).send("discussionId must be a string");
    return;
  }
  discussionId = discussionId.trim();
  if (!ObjectId.isValid(discussionId)) {
    res.status(400).send("discussionId is not a valid id");
    return;
  }
  try {
    let response = await discussionData.getDiscussion(discussionId);
    for (let i = 0; i < response.posts.length; i++) {
      let currPost = response.posts[i];
      let currProf = await userData.getUserData(currPost.ownerId.toString());
      response.posts[i].ownerPfp = currProf.pfp;
      response.posts[i].ownerUsn = currProf.username;
      if (req.session.user) {
        if (currPost.ownerId.toString() === req.session.user.uid) {
          response.posts[i].isOwner = true;
        }
      }
    }
    if (response) {
      res.render("discussion", {
        title: response.topic,
        posts: response.posts,
      });
    } else {
      res.status(500).send("Failed to retrieve discussion.");
    }
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/forum/getdiscussion", async (req, res) => {
  let { discussionId } = req.body;
  if (!discussionId) {
    res.status(400).send("discussionId is a required field");
    return;
  }
  if (typeof discussionId != "string") {
    res.status(400).send("discussionId must be a string");
    return;
  }
  discussionId = discussionId.trim();
  if (!ObjectId.isValid(discussionId)) {
    res.status(400).send("discussionId is not a valid id");
    return;
  }
  try {
    let response = await discussionData.getDiscussion(discussionId);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(500).send("Failed to retrieve discussion.");
    }
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/forum/getrecentposts", async (req, res) => {
  try {
    let response = await discussionData.getMostRecentPosts();
    if (response) {
      for (let i = 0; i < response.length; i++) {
        let resUserData = await userData.getUserData(
          response[i].ownerId.toString()
        );
        response[i].username = resUserData.username;
        response[i].pfp = resUserData.pfp;
      }
      res.status(200).json(response);
    } else {
      res.status(500).send("Failed to retrieve posts.");
    }
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
