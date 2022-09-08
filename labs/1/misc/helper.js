/* eslint-disable no-underscore-dangle */
const { ObjectId } = require('mongodb');
const { checkId } = require('./validate');
const { getSweet } = require('../data/sweets');

const sweetBelongsToUser = async (req, sweetId) => {
  const id = checkId(sweetId);
  const sweet = await getSweet(id);
  const { userThatPosted } = sweet;
  const belongs = userThatPosted._id.toString() === req.session.user._id;
  return belongs;
};

const replyBelongsToUser = async (req, sweetId, replyId) => {
  const sid = checkId(sweetId);
  const rid = checkId(replyId);
  const sweet = await getSweet(sid);
  const { replies } = sweet;
  // my objectid is messed up somehow i am sad
  const match = replies.filter((x) => x._id === new ObjectId(rid) || x._id.toString() === rid);
  if (match.length !== 1) throw new Error('No reply with such id');
  const [reply] = match;
  const { userThatPostedReply } = reply;
  const belongs = userThatPostedReply._id.toString() === req.session.user._id;
  return belongs;
};

module.exports = {
  sweetBelongsToUser,
  replyBelongsToUser,
};
