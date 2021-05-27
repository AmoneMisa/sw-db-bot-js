const monstersCallbacks = require('./monster');
const scrollsCallbacks = require('./scrolls');
const languageCallback = require('./language');
const rat = require('./rat');

module.exports = [
    ...monstersCallbacks,
    ...languageCallback,
    ...scrollsCallbacks,
    ...rat
];