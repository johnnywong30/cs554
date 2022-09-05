/* eslint-disable no-underscore-dangle */
const { checkId } = require('./validate');
const { getSweet } = require('../data/sweets');

const sweetBelongsToUser = async (req) => {
  const sweetId = checkId(req.params.id);
  const sweet = await getSweet(sweetId);
  const { userThatPosted } = sweet;
  return userThatPosted._id !== req.session.user._id;
};

module.exports = {
  sweetBelongsToUser,
};
