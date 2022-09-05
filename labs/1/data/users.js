/* eslint-disable no-underscore-dangle */
// Name: Johnny Wong
// Course: CS-554-WS
// Date: September 8, 2022
// Pledge: I pledge my honor that I have abided by the Stevens Honor System.
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const { checkString, checkUsername, checkPassword } = require('../misc/validate');
const { users } = require('../config/mongoCollections');

const saltRounds = 16;

module.exports = {
  createUser: async (name, username, password) => {
    const _name = checkString(name);
    const user = checkUsername(username);
    const pass = checkPassword(password);
    const collection = await users();
    // source: https://stackoverflow.com/a/23028065
    const account = await collection.findOne({ username: { $regex: new RegExp(user, 'i') } });
    if (account !== null) throw new Error(`Account with username ${user} exists already`);
    const saltedPass = await bcrypt.hash(pass, saltRounds);
    const newUser = {
      _id: new ObjectId(),
      name: _name,
      username: user,
      password: saltedPass,
    };
    const insertInfo = await collection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw new Error('could not add user');
    return {
      // eslint-disable-next-line no-underscore-dangle
      _id: newUser._id.toString(),
      name: newUser.name,
      username: newUser.username,
    };
  },
  validateUser: async (username, password) => {
    const user = checkUsername(username);
    const pass = checkPassword(password);
    const collection = await users();
    // source: https://stackoverflow.com/a/23028065
    const account = await collection.findOne({ username: { $regex: new RegExp(user, 'i') } });
    if (account === null) throw new Error('Either the username or password is invalid');
    let match = false;
    try {
      match = await bcrypt.compare(pass, account.password);
    } catch (e) {
      // no op
    }
    if (!match) throw new Error('Either the username or password is invalid');
    return {
      // eslint-disable-next-line no-underscore-dangle
      _id: account._id.toString(),
      name: account.name,
      username: account.username,
    };
  },

};
