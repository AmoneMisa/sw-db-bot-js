const effectFilter = require('./effectFilter');
const effectName = require('./effectName');
const effectType = require('./effectType');

module.exports = [
    ...effectFilter,
    ...effectName,
    ...effectType
];