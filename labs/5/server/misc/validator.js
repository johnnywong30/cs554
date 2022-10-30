const { validate } = require('uuid')

const checkPageNum = pageNum => {
    if (!pageNum) throw new Error('pageNum does not exist')
    if (!Number.isInteger(pageNum)) throw new Error('pageNum is not an integer')
    if (pageNum < 1) throw new Error('pageNum must be greater than or equal to 1')
    return pageNum
}

const checkString = (str, arg) => {
    if (!str) throw new Error(`${arg || 'argument'} does not exist`)
    if (typeof(str) !== 'string') throw new Error(`${arg || 'argument'} is not a string`)
    const string = str.trim()
    if (string.length < 1) throw new Error(`${arg || 'argument'} cannot be an empty string`)
    return string
}

const checkId = id => {
    const uuid = checkString(id, 'uuid')
    if (!validate(uuid)) throw new Error('id is not a valid uuid')
    return uuid
}

module.exports = {
    checkPageNum,
    checkString,
    checkId
}