/* eslint-disable no-underscore-dangle */
const { checkId } = require('./validate');
const { getSweet } = require('../data/sweets');

const sweetBelongsToUser = async (req, sweetId) => {
  const id = checkId(sweetId);
  const sweet = await getSweet(id);
  const { userThatPosted } = sweet;
  return userThatPosted._id !== req.session.user._id;
};

module.exports = {
  sweetBelongsToUser,
};
