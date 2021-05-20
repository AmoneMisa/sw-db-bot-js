const monsterPropertiesCallbacks = require('./monsterProperties/monsterProperties');
const monsterStatsCallbacks = require('./monsterStats/monsterStats');
const skillsCallbacks = require('./skills/skills');
const skillEffectsCallbacks = require('./skillEffects/skillEffects');
const effectsCallbacks = require('./effects/effects');
const leaderSkillCallbacks = require('./leaderSkill/leaderSkill');
const monstersCallbacks = require('./monsters/monstersNew');

module.exports = [
    ...leaderSkillCallbacks,
    ...effectsCallbacks,
    ...skillEffectsCallbacks,
    ...skillsCallbacks,
    ...monsterStatsCallbacks,
    ...monsterPropertiesCallbacks,
    ...monstersCallbacks
];