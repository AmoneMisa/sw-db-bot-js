const monstersCallbacks = require('./monster');
const languageCallback = require('./language');

module.exports = [
    ...monstersCallbacks,
    ...languageCallback
];