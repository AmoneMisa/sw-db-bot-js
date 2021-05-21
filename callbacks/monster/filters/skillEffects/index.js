const skillEffectsFilter = require('./skillEffectsFilter');
const skillEffectsChance = require('./skillEffectsChance');
const skillEffectsAoe = require('./skillEffectsAoe');
const skillEffectsDmg = require('./skillEffectsDmg');

module.exports = [
    ...skillEffectsFilter,
    ...skillEffectsChance,
    ...skillEffectsAoe,
    ...skillEffectsDmg
];