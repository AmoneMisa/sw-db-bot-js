const dictionary = require('../dictionaries/filtersDictionary');

function forEach(obj, dictionary) {
    let string = "";

    for (let key of Object.keys(obj)) {
        if (dictionary[key] !== undefined) {
            string += `\n${dictionary[key]}: ${obj[key]}`;
        }
    }
    return string;
}

function buildSkillsString(skills) {
    let string = "";
    let skillEffectsString = "\n-Скилл эффекты-";
    let effectString = "\n-Эффект-";
    for (let skill of skills) {
        string += forEach(skill, dictionary.skillsDictionary);
        if (skill.effects && skill.effects.length) {
            for (let skillEffect of skill.effects) {
                skillEffectsString += forEach(skillEffect, dictionary.skillEffectsDictionary);
                string += skillEffectsString;
                if (skillEffect.effect) {
                    effectString += forEach(skillEffect.effect, dictionary.effectDictionary);
                    string += effectString;
                }
            }
        }
    }
    return string;
}

module.exports = function (filter, lang) {
    let string = "";
    let skillsString = "\n- Скиллы -";
    let leaderSkillString = "\n- Лидерка -";

    for (let key of Object.keys(filter)) {
        if (key === "skills") {
            skillsString += buildSkillsString(filter.skills);
        } else if (key === "leaderSkill") {
            leaderSkillString += forEach(filter.leaderSkill, dictionary[lang].leaderSkillDictionary);
        } else {
            string += `\n${dictionary[lang][key]}: ${filter[key]}`;
        }
    }

    if (filter.skills) {
        string += skillsString;
    }

    if (filter.leaderSkill) {
        string += leaderSkillString;
    }

    return string;
};