module.exports = {
  checkId: (id) => {
    if (!id) throw new Error('id does not exist!');
    const num = Number(id);
    if (typeof num !== 'number' || Number.isNaN(num) || !Number.isInteger(num)) throw new Error('id is not an integer!');
    if (num < 0) throw new Error('id cannot be a negative integer!');
    return id;
  },
  checkPage: (pagenum) => {
    if (!pagenum) throw new Error('pagenum does not exist!');
    const num = Number(pagenum)
    if (typeof num !== 'number' || Number.isNaN(num) || !Number.isInteger(num)) throw new Error('pagenum is not an integer!');
    if (num <= 0) throw new Error('pagenum has to be a positive integer!');
    return pagenum;
  }
};
