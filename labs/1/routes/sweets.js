// Name: Johnny Wong
// Course: CS-554-WS
// Date: September 8, 2022
// Pledge: I pledge my honor that I have abided by the Stevens Honor System.

const express = require('express');
const {
  checkString, checkId, checkSweetMood, checkNumber, checkUsername, checkPassword,
} = require('../misc/validate');
const { createUser, validateUser } = require('../data/users');
const {
  createSweet, getSweet, getSweets, updateSweet, replySweet, deleteReplySweet, likeSweet,
} = require('../data/sweets');

const sweetsRouter = express.Router();

sweetsRouter
  .route('/signup')
  .post(async (req, res) => {
    const { username, password, name } = req.body;
    let registered;
    try {
      const personName = checkString(name);
      const user = checkUsername(username);
      const pass = checkPassword(password);
      registered = await createUser(personName, user, pass);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    return res.status(200).json(registered);
  });

sweetsRouter
  .route('/login')
  .post(async (req, res) => {
    const { username, password } = req.body;
    let validated;
    try {
      const user = checkUsername(username);
      const pass = checkPassword(password);
      validated = await validateUser(user, pass);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    req.session.user = {
      // eslint-disable-next-line no-underscore-dangle
      _id: validated._id,
      username: validated.username,
    };
    return res.status(200).json(validated);
  });

sweetsRouter
  .route('/logout')
  .get(async (req, res) => {
    if (req.session.user) {
      req.session.destroy();
      return res.status(200).json({ message: 'Successfully logged out!' });
    }
    return res.status(200).json({ message: 'You were not logged in before...' });
  });

sweetsRouter
  .route('/')
  .get(async (req, res) => {
    const { page } = req.query;
    const pageNum = !page ? 1 : checkNumber(Number(page));
    try {
      if (pageNum < 1 || !Number.isInteger(pageNum)) throw new Error('Invalid page number');
      const sweets = await getSweets(pageNum);
      return res.status(200).json(sweets);
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    const { sweetText, sweetMood } = req.body;
    try {
      const text = checkString(sweetText);
      const mood = checkSweetMood(sweetMood);
      const { _id, username } = req.session.user;
      const uid = checkId(_id);
      const user = checkUsername(username);

      const sweetInfo = {
        sweetText: text,
        sweetMood: mood,
      };
      const userInfo = {
        userId: uid,
        username: user,
      };
      const sweet = await createSweet(sweetInfo, userInfo);

      return res.status(200).json(sweet);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  });

sweetsRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const sweetId = checkId(req.params.id);
      const sweet = await getSweet(sweetId);
      return res.status(200).json(sweet);
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const sweetId = checkId(req.params.id);
      const { sweetText, sweetMood } = req.body;

      if (!sweetText && !sweetMood) throw new Error('Need one updated sweetText or sweetMood');
      const oldSweet = await getSweet(sweetId);
      const sameText = sweetText && oldSweet.sweetText === checkString(sweetText);
      const sameMood = sweetMood && oldSweet.sweetMood === checkSweetMood(sweetMood);
      const bothPresent = sweetText && sweetMood;
      //   if both present and one is 0
      if (sameText && sameMood) throw new Error('Updated sweetText and sweetMood cannot be the same as their originals');
      //   if (bothPresent && (!sameText || !sameMood)) throw new Error('Updated sweetText cannot be the same as original');
      //   if (bothPresent && (!sameText || !sameMood)) throw new Error('Updated sweetMood cannot be the same as original');
      if (!bothPresent && sameText) throw new Error('Updated sweetText cannot be the same as original');
      if (!bothPresent && sameMood) throw new Error('Updated sweetMood cannot be the same as original');

      const body = {};
      if (sweetText) body.sweetText = checkString(sweetText);
      if (sweetMood) body.sweetMood = checkSweetMood(sweetMood);
      const sweet = await updateSweet(sweetId, body);
      return res.status(200).json(sweet);
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  });

sweetsRouter
  .route('/:id/replies')
  .post(async (req, res) => {
    try {
      const sweetId = checkId(req.params.id);
      const { reply } = req.body;
      const replyText = checkString(reply);
      const { _id, username } = req.session.user;
      const userInfo = {
        userId: checkId(_id),
        username: checkUsername(username),
      };
      const sweet = await replySweet(sweetId, replyText, userInfo);
      return res.status(200).json(sweet);
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  });

sweetsRouter
  .route('/:sweetId/:replyId')
  .delete(async (req, res) => {
    try {
      const { sweetId, replyId } = req.params;
      const sid = checkId(sweetId);
      const rid = checkId(replyId);
      await getSweet(sid);
      const sweet = await deleteReplySweet(sid, rid);
      return res.status(200).json(sweet);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  });

sweetsRouter
  .route('/:id/likes')
  .post(async (req, res) => {
    try {
      const { id } = req.params;
      const { _id } = req.session.user;
      const sid = checkId(id);
      const uid = checkId(_id);
      await getSweet(sid);
      const sweet = await likeSweet(sid, uid);
      return res.status(200).json(sweet);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  });

module.exports = {
  sweetsRouter,
};
