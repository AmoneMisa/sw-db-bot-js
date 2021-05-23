const monstersCallbacks = require('./monster');
const languageCallback = require('./language');
const fuckYou = require('./rat');

module.exports = [
    ...monstersCallbacks,
    ...languageCallback,
    ...fuckYou
];