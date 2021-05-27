const scrolls = require('./scrollsMain');
const mysticScrolls = require('./mysticScrolls');
const legendaryScrolls = require('./legendaryScrolls');
const transcendScrolls = require('./transcendScrolls');
const ldScrolls = require('./ldScrolls');
const scrollsCount = require('./scrollsCount');
const scrollsCommands = require('./scrollsCommands');

module.exports = [
    ...mysticScrolls,
    ...legendaryScrolls,
    ...transcendScrolls,
    ...ldScrolls,
    ...scrollsCount,
    ...scrollsCommands,
    ...scrolls
];