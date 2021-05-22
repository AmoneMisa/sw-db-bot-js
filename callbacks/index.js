const monstersCallbacks = require('./monster');
const languageCallback = require('./language');
const scrollsCallback = require('./scrolls');

module.exports = [
    ...monstersCallbacks,
    ...languageCallback,
    ...scrollsCallback
];