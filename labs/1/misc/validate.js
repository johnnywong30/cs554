const { ObjectId } = require('mongodb');

const validate = {
  checkString(str) {
    if (!str) throw new Error('string does not exist!');
    if (typeof str !== 'string') throw new Error('input is not a string!');
    const trimmed = str.trim();
    if (trimmed.length < 1) throw new Error('input string cannot be just empty spaces!');
    return trimmed;
  },
  checkNumber(num) {
    if (!num) throw new Error('number does not exist!');
    if (typeof num !== 'number' || Number.isNaN(num)) throw new Error('input is not a number!');
    return num;
  },
  checkId(id) {
    if (!id) throw new Error('id does not exist!');
    if (typeof id !== 'string') throw new Error('id is not a string!');
    const trimmed = id.trim();
    if (trimmed.length < 1) throw new Error('id cannot be just empty spaces!');
    if (!ObjectId.isValid(trimmed)) throw new Error('ID is not a valid Object ID');
    // return id to query mongo db
    return trimmed;
  },
  checkUsername(username) {
    if (!username) throw new Error('username does not exist');
    if (typeof username !== 'string') throw new Error('username is not a string');
    const trimmed = username.trim();
    if (trimmed.length < 1) throw new Error('username cannot be empty spaces');
    // regex source: https://coderzway.com/alphanumeric-validation-in-javascript/
    const regex = /^[0-9a-zA-Z]+$/;
    if (!regex.test(trimmed)) throw new Error('username must only be alphanumeric characters');
    if (trimmed.length < 4) throw new Error('username must be at least 4 characters long');
    return trimmed;
  },
  checkPassword(password) {
    if (!password) throw new Error('password does not exist');
    if (typeof password !== 'string') throw new Error('password is not a string');
    const trimmed = password.trim();
    if (trimmed.length < 1) throw new Error('password cannot be empty spaces');
    // regex source: https://stackoverflow.com/a/16334856
    const regex = /^\S*$/;
    if (!regex.test(trimmed)) throw new Error('password cannot contain spaces');
    if (trimmed.length < 6) throw new Error('password must be at least 6 characters long');
    return trimmed;
  },
};

module.exports = validate;
