module.exports = {
  checkId: (id) => {
    if (!id) throw new Error('id does not exist!');
    if (typeof id !== 'number' || Number.isNaN(id) || !Number.isInteger(id)) throw new Error('id is not an integer!');
    if (id < 0) throw new Error('id cannot be a negative integer!');
    // console.log(id);
    return id;
  },
};
