const monsterPropertiesCallbacks = require('./monsterProperties/monsterProperties');
const monsterStatsCallbacks = require('./monsterStats/monsterStats');
const skillsCallbacks = require('./skills/skills');
const skillEffectsCallbacks = require('./skillEffects/skillEffects');
const effectsCallbacks = require('./effects/effects');
const leaderSkillCallbacks = require('./leaderSkill/leaderSkill');
const monstersStart = require('./monsters/monstersStart');
const monstersCallbacks = require('./monsters/monsters');

module.exports = [
    ...monstersStart,
    ...leaderSkillCallbacks,
    ...effectsCallbacks,
    ...skillEffectsCallbacks,
    ...skillsCallbacks,
    ...monsterStatsCallbacks,
    ...monsterPropertiesCallbacks,
    ...monstersCallbacks
];