const skillEffectsFilter = require('./skillEffectsFilter');
const skillEffectsChance = require('./skillEffectsChance');
const skillEffectsAoe = require('./skillEffectsAoe');

module.exports = [
    ...skillEffectsFilter,
    ...skillEffectsChance,
    ...skillEffectsAoe
];