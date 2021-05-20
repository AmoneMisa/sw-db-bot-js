const formatEffect = require('./formatEffect');

module.exports = function (effects) {
    if (!effects) {
        return;
    }

    let effectsMessage = "";

    for (let skillEffect of effects) {
        effectsMessage += `Chance: ${skillEffect.chance}% | Quantity: ${skillEffect.quantity}\n`;

        if (skillEffect.aoe) {
            effectsMessage += "Aoe \n"
        }
        if (skillEffect.singleTarget) {
            effectsMessage += "Single Target \n"
        }
        if (skillEffect.selfEffect) {
            effectsMessage += "Self Effect \n"
        }
        if (skillEffect.onCrit) {
            effectsMessage += "On Crit \n"
        }
        if (skillEffect.onCrit) {
            effectsMessage += "On Death \n"
        }
        if (skillEffect.selfHp) {
            effectsMessage += "Self Hp \n"
        }
        if (skillEffect.targetHp) {
            effectsMessage += "Target Hp \n"
        }
        if (skillEffect.damage) {
            effectsMessage += "Deal Damage \n"
        }
        if (skillEffect.note) {
            effectsMessage += `Note: ${skillEffect.note}`
        }

        if (skillEffect.effect) {
            effectsMessage += `- Effect -\n${formatEffect(skillEffect.effect)}`;
        }
    }
    return effectsMessage;
};