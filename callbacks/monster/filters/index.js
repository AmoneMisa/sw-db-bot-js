const monstersFilter = require('./monstersFilter');
const monsterPropertiesCallbacks = require('./monsterProperties');
const monsterStatsCallbacks = require('./monsterStats');
const skillsCallbacks = require('./skills');
const skillEffectsCallbacks = require('./skillEffects');
const effectsCallbacks = require('./effects');
const leaderSkillCallbacks = require('./leaderSkill');

module.exports = [
    ...monstersFilter,
    ...leaderSkillCallbacks,
    ...effectsCallbacks,
    ...skillEffectsCallbacks,
    ...skillsCallbacks,
    ...monsterStatsCallbacks,
    ...monsterPropertiesCallbacks
];