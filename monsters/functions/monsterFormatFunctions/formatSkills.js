const formatEffects = require('./formatEffects');

module.exports = function (monster) {
    let skills = "";

    for (let skill of monster.skills) {
        skills += `\n - Slot: ${skill.slot} -
Cooltime: ${skill.cooltime} | Hits: ${skill.hits} | Max lvl: ${skill.maxLevel}\n`;

        if (skill.scalesWith) {
            skills += `Scales with: ${skill.scalesWith}\n`
        }
        if (skill.multiplierFormula) {
            skills += `Multiplier formula: ${skill.multiplierFormula}\n`
        }
        if (skill.passive) {
            skills += "Passive\n"
        }
        if (skill.aoe) {
            skills += "Property: Aoe\n"
        }
        if (skill.effects && skill.effects.length) {
            skills += `- Effects -\n${formatEffects(skill.effects)}`;
        }
    }

    return skills;
};