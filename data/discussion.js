const mongoCollections = require("../config/mongoCollections");
const discussions = mongoCollections.discussion_data;
const userData = require("./user");
const { ObjectId } = require("mongodb");

async function createDiscussion(ownerId, topic) {
  if (!ownerId) {
    throw "ownerId is a required field";
  }
  if (!topic) {
    throw "Topic is a required field";
  }
  if (typeof ownerId != "string") {
    throw "ownerId must be a string";
  }
  if (typeof topic != "string") {
    throw "Topic must be a string";
  }
  ownerId = ownerId.trim();
  topic = topic.trim();
  if (!ObjectId.isValid(ownerId)) {
    throw "ownerId is not a valid id";
  }
  try {
    await userData.getUser(ownerId);
    const discussionCollection = await discussions();
    const newDiscussionInfo = {
      _id: ObjectId(),
      ownerId: ObjectId(ownerId),
      topic: topic,
      posts: [],
      originalDate: new Date(),
    };
    const insertDiscussion = await discussionCollection.insertOne(
      newDiscussionInfo
    );
    if (!insertDiscussion.acknowledged || !insertDiscussion.insertedId) {
      throw "Could not add discussion to db";
    }
    return { discussionId: newDiscussionInfo._id };
  } catch (e) {
    throw e;
  }
}

async function addPostToDiscussion(discussionId, postOwnerId, postContent) {
  if (!discussionId) {
    throw "discussionId is a required field";
  }
  if (typeof discussionId != "string") {
    throw "discussionId must be a string";
  }
  discussionId = discussionId.trim();
  if (!ObjectId.isValid(discussionId)) {
    throw "discussionId is not valid";
  }
  if (!postOwnerId) {
    throw "postOwnerId is a required field";
  }
  if (typeof postOwnerId != "string") {
    throw "postOwnerId must be a string";
  }
  postOwnerId = postOwnerId.trim();
  if (!ObjectId.isValid(postOwnerId)) {
    throw "postOwnerId is not valid";
  }
  if (!postContent) {
    throw "postContent is a required field";
  }
  if (typeof postContent != "string") {
    throw "psotContent must be a string";
  }
  postContent = postContent.trim();
  const discussionCollection = await discussions();
  const newPost = {
    _id: ObjectId(),
    ownerId: ObjectId(postOwnerId),
    content: postContent,
    date: new Date(),
    discussionId: discussionId,
  };
  const update = await discussionCollection.updateOne(
    { _id: ObjectId(discussionId) },
    { $push: { posts: newPost } }
  );
  if (update.modifiedCount != 0) {
    return newPost._id;
  }
}

async function getDiscussion(discussionId) {
  if (!discussionId) {
    throw "discussionId is a required field";
  }
  if (typeof discussionId != "string") {
    throw "discussionId must be a string";
  }
  discussionId = discussionId.trim();
  if (!ObjectId.isValid(discussionId)) {
    throw "discussionId is not valid";
  }
  const discussionCollection = await discussions();
  const discussion = await discussionCollection.findOne({
    _id: ObjectId(discussionId),
  });
  if (!discussion) {
    throw "Discussion not found";
  }
  return discussion;
}

async function getAllDiscussions() {
  const discussionCollection = await discussions();
  const response = await discussionCollection.find({}).toArray();
  if (!response) {
    throw "Discussions not found";
  }
  return response;
}

async function getMostRecentPosts() {
  const response = await getAllDiscussions();
  let recentPosts = [];
  for (let i = 0; i < response.length; i++) {
    recentPosts = recentPosts.concat(response[i].posts);
  }
  recentPosts = recentPosts.sort((a, b) => {
    return a.date > b.date;
  });
  if (recentPosts.length >= 5) {
    recentPosts = recentPosts.slice(4);
  }
  return recentPosts;
}

async function getPost(postId) {
  if (!postId) {
    throw "postId is a required field";
  }
  if (typeof postId != "string") {
    throw "postId must be a string";
  }
  postId = postId.trim();
  if (!ObjectId.isValid(postId)) {
    throw "postId is not valid";
  }
  const discussionCollection = await discussions();
  const response = await discussionCollection
    .find({
      "posts._id": ObjectId(postId),
    })
    .toArray();
  if (!response) {
    throw "Post not found";
  }
  return response[0].posts[0];
}

module.exports = {
  createDiscussion,
  addPostToDiscussion,
  getDiscussion,
  getAllDiscussions,
  getMostRecentPosts,
  getPost,
};
