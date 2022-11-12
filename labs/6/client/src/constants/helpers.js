export const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const toPercent = (num1, num2) => {
    return Math.floor((num1 / num2) * 100)
}

const helpers = {
    capitalize,
    toPercent
}

export default helpers;