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
    return module.exports.getSweet(sweetId.toString());
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
    return sweetsPage;
  },
  updateSweet: async (sweetId, { sweetText, sweetMood }) => {

  },
  replySweet: async (sweetId, reply, { userId, username }) => {

  },
  deleteReplySweet: async (sweetId, replyId, userId) => {

  },
  likeSweet: async (sweetId, userId) => {

  },

};
