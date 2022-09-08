/* eslint-disable no-underscore-dangle */
const { checkId } = require('./validate');
const { getSweet } = require('../data/sweets');

const sweetBelongsToUser = async (req, sweetId) => {
  const id = checkId(sweetId);
  const sweet = await getSweet(id);
  const { userThatPosted } = sweet;
  const belongs = userThatPosted._id === req.session.user._id;
  return belongs;
};

const replyBelongsToUser = async (req, sweetId, replyId) => {
  const sid = checkId(sweetId);
  const rid = checkId(replyId);
  const sweet = await getSweet(sid);
  const { replies } = sweet;
  const match = replies.filter((x) => x._id === rid);
  if (match.length !== 1) throw new Error('No reply with such id');
  const [reply] = match;
  const { userThatPostedReply } = reply;
  const belongs = userThatPostedReply._id === req.session.user._id;
  return belongs;
};

module.exports = {
  sweetBelongsToUser,
  replyBelongsToUser,
};
