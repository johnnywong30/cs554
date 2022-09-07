/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
// Name: Johnny Wong
// Course: CS-554-WS
// Date: September 8, 2022
// Pledge: I pledge my honor that I have abided by the Stevens Honor System.
const { ObjectId } = require('mongodb');
const {
  checkNumber, checkString, checkSweetMood, checkId, checkUsername,
} = require('../misc/validate');
const { sweets } = require('../config/mongoCollections');

module.exports = {
  createSweet: async ({ sweetText, sweetMood }, { userId, username }) => {
    const text = checkString(sweetText);
    const mood = checkSweetMood(sweetMood);
    const uid = checkId(userId);
    const user = checkUsername(username);
    const collection = await sweets();

    const sweetId = new ObjectId();
    const newSweet = {
      _id: sweetId,
      sweetText: text,
      sweetMood: mood,
      userThatPosted: {
        _id: ObjectId(uid),
        username: user,
      },
      replies: [],
      likes: [],
    };

    const insertInfo = await collection.insertOne(newSweet);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw new Error('Could not create Sweet');
    return await module.exports.getSweet(sweetId.toString());
  },
  getSweet: async (sweetId) => {
    const id = checkId(sweetId);
    const collection = await sweets();
    const sweet = await collection.findOne({ _id: ObjectId(id) });
    if (!sweet) throw new Error('No Sweet with such id');
    return sweet;
  },
  getSweets: async (page) => {
    const pageNum = checkNumber(page);
    const paginationAmt = 50;
    const collection = await sweets();
    const sweetsPage = await collection.find({})
      .skip((pageNum - 1) * paginationAmt)
      .limit(paginationAmt)
      .toArray();
    if (sweetsPage.length < 1) throw new Error('There are no more Sweets...');
    return sweetsPage;
  },
  updateSweet: async (sweetId, { sweetText, sweetMood }) => {
    const id = checkId(sweetId);
    if (!sweetText && !sweetMood) throw new Error('Need at least sweetText or sweetMood to update Sweet');
    const updateDetails = {};
    if (sweetText) updateDetails.sweetText = checkString(sweetText);
    if (sweetMood) updateDetails.sweetMood = checkSweetMood(sweetMood);

    const collection = await sweets();
    const updatedSweet = await collection.updateOne(
      { _id: ObjectId(id) },
      { $set: updateDetails },
    );
    if (updatedSweet.modifiedCount < 1) throw new Error('Could not update Sweet successfully');
    return await module.exports.getSweet(id);
  },
  replySweet: async (sweetId, reply, { userId, username }) => {
    const id = checkId(sweetId);
    const text = checkString(reply);
    const uid = checkId(userId);
    const user = checkUsername(username);

    const collection = await sweets();
    const replyId = new ObjectId();
    const newReply = {
      _id: replyId,
      userThatPostedReply: {
        _id: ObjectId(uid),
        username: user,
      },
      reply: text,
    };
    const addReply = await collection.updateOne(
      { _id: ObjectId(id) },
      { $addToSet: { replies: newReply } },
    );
    if (addReply.modifiedCount < 1) throw new Error('Could not add reply to Sweet');
    return await module.exports.getSweet(id);
  },
  deleteReplySweet: async (sweetId, replyId) => {
    const id = checkId(sweetId);
    const repId = checkId(replyId);

    const collection = await sweets();
    const delReply = await collection.updateOne(
      { _id: ObjectId(id) },
      { $pull: { replies: { _id: ObjectId(repId) } } },
    );
    if (delReply.modifiedCount < 1) throw new Error('Could not remove reply from Sweet');
    return await module.exports.getSweet(id);
  },
  likeSweet: async (sweetId, userId) => {
    const id = checkId(sweetId);
    const uid = checkId(userId);

    const collection = await sweets();
    const sweet = await module.exports.getSweet(id);
    const dislike = sweet.replies.includes(uid);
    const action = dislike ? { $pull: { likes: ObjectId(uid) } }
      : { $addToSet: { likes: ObjectId(uid) } };
    const updateSweet = await collection.updateOne(
      { _id: ObjectId(id) },
      action,
    );
    if (updateSweet.modifiedCount < 1) throw new Error('Could not update like status on Sweet');
    return await module.exports.getSweet(id);
  },

};
