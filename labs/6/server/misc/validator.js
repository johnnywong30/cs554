const checkPageNum = pageNum => {
    if (!pageNum) throw new Error('pageNum does not exist!');
    const num = Number(pageNum);
    if (typeof num !== 'number' || Number.isNaN(num) || !Number.isInteger(num)) throw new Error('pageNum is not an integer!');
    if (num <= 0) throw new Error('pageNum has to be a positive integer!');
    return pageNum;
}

const checkId = id => {
    if (!id) throw new Error('id does not exist!');
    const num = Number(id);
    if (typeof num !== 'number' || Number.isNaN(num) || !Number.isInteger(num)) throw new Error('id is not valid!');
    if (num <= 0) throw new Error('id must be a positive integer!');
    return id;
}

const validator = {
    checkPageNum,
    checkId
}

module.exports = validator;