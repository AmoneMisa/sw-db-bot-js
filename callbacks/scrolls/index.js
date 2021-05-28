const scrolls = require('./scrollsMain');
const scrollsType = require('./scrollsType');
const scrollsCount = require('./scrollsCount');
const scrollsCommands = require('./scrollsCommands');

module.exports = [
    ...scrollsType,
    ...scrollsCount,
    ...scrollsCommands,
    ...scrolls
];