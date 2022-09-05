// Name: Johnny Wong
// Course: CS-554-WS
// Date: September 8, 2022
// Pledge: I pledge my honor that I have abided by the Stevens Honor System.

const express = require('express');
const {
  checkString, checkId, checkNumber, checkUsername, checkPassword,
} = require('../misc/validate');
const { createUser, validateUser } = require('../data/users');

const sweetsRouter = express.Router();

sweetsRouter
  .route('/signup')
  .post(async (req, res) => {
    // if logged in, cannot sign up, just return your own user session info
    if (req.session.user) return res.status(200).json(req.session.user);
    const { username, password } = req.body;
    let registered;
    try {
      const user = checkUsername(username);
      const pass = checkPassword(password);
      registered = await createUser(user, pass);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    return res.status(200).json(registered);
  });

sweetsRouter
  .route('/login')
  .post(async (req, res) => {
    // if logged in, cannot login, just return your own user session info
    if (req.session.user) return res.status(200).json(req.session.user);
    const { username, password } = req.body;
    let validated;
    try {
      const user = checkUsername(username);
      const pass = checkPassword(password);
      validated = await validateUser(user, pass);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    req.session.user = validated;
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

  })
  .post(async (req, res) => {

  });

sweetsRouter
  .route('/:id')
  .get(async (req, res) => {

  })
  .patch(async (req, res) => {

  });

sweetsRouter
  .route('/:id/replies')
  .post(async (req, res) => {

  });

sweetsRouter
  .route('/:sweetId/:replyId')
  .delete(async (req, res) => {

  });

sweetsRouter
  .route('/:id/likes')
  .post(async (req, res) => {

  });

module.exports = {
  sweetsRouter,
};
