const leaderSkillFilter = require('./leaderSkillFilter');
const leaderSkillAmount = require('./leaderSkillAmount');
const leaderSkillArea = require('./leaderSkillArea');
const leaderSkillAttribute = require('./leaderSkillAttribute');
const leaderSkillElement = require('./leaderSkillElement');

module.exports = [
    ...leaderSkillFilter,
    ...leaderSkillArea,
    ...leaderSkillAmount,
    ...leaderSkillAttribute,
    ...leaderSkillElement
];