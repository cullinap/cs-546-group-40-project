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
      ownerId: ObjectId(ownerId),
      topic: topic,
      posts: [],
      originalDate: new Date().toDateString(),
    };
    const insertDiscussion = await discussionCollection.insertOne(
      newDiscussionInfo
    );
    if (!insertDiscussion.acknowledged || !insertDiscussion.insertedId) {
      throw "Could not add discussion to db";
    }
    return { discussionInserted: true };
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
  try {
    await userData.getUser(postOwnerId);
    const discussionCollection = await discussions();
    const post = {
      _id: ObjectId(),
      ownerId: ObjectId(ownerId),
      content: postContent,
      date: new Date().toDateString(),
      discussionId: discussionId,
    };
    const update = await discussionCollection.updateOne(
      { _id: ObjectId(discussionId) },
      { $push: { posts: post } }
    );
    return update.modifiedCount != 0;
  } catch (e) {
    throw e;
  }
}

async function removeDiscussion(ownerId, discussionId) {
  if (!ownerId) {
    throw "ownerId is a required field";
  }
  if (typeof ownerId != "string") {
    throw "ownerId must be a string";
  }
  if (!discussionId) {
    throw "discussionId is a required field";
  }
  if (typeof discussionId != "string") {
    throw "discussionId must be a string";
  }
  ownerId = ownerId.trim();
  discussionId = discussionId.trim();
  if (!ObjectId.isValid(ownerId)) {
    throw "ownerId is not valid";
  }
  if (!ObjectId.isValid(discussionId)) {
    throw "discussionId is not valid";
  }
  try {
    await userData.getUser(ownerId);
    const discussionCollection = await discussions();
    const discussion = await discussionCollection.findOne({
      $and: [
        {
          ownerId: ObjectId(ownerId),
        },
        {
          _id: ObjectId(discussionId),
        },
      ],
    });
    if (!discussion) {
      throw "User cannot delete discussion";
    }
    const deletion = await discussionCollection.deleteOne({
      _id: ObjectId(discussionId),
    });
    if (deletion.deletedCount == 0) {
      throw "Discussion could not be deleted";
    }
    return { discussionRemoved: true };
  } catch (e) {
    throw e;
  }
}

module.exports = { createDiscussion, removeDiscussion, addPostToDiscussion };
