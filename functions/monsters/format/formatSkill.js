const formatEffects = require('./formatEffects');

module.exports = function (skill) {
    let skillString = "";

    skillString += `- Slot: ${skill.slot} -
Cooltime: ${skill.cooltime} | Hits: ${skill.hits} | Max lvl: ${skill.maxLevel}\n`;

    if (skill.scalesWith && skill.scalesWith.length) {
        skillString += `Scales with: ${skill.scalesWith}\n`
    }
    if (skill.multiplierFormula) {
        skillString += `Multiplier formula: ${skill.multiplierFormula}\n`
    }
    if (skill.passive) {
        skillString += "Passive\n"
    }
    if (skill.aoe) {
        skillString += "Property: Aoe\n"
    }
    if (skill.effects && skill.effects.length) {
        skillString += `- Effects -\n${formatEffects(skill.effects)}`;
    }

    skillString += "\n";

    return skillString;
};