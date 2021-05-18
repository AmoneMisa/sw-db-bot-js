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

function buildSkillsString(skills, lang) {
    let string = "";
    let skillEffectsString = lang === "ru" ? "\n-Скилл эффекты-" : "\n- Skill effects -";
    let effectString = lang === "ru" ? "\n-Эффект-" : "\n-Effect-";
    for (let skill of skills) {
        string += forEach(skill, dictionary[lang].skillsDictionary);
        if (skill.effects && skill.effects.length) {
            for (let skillEffect of skill.effects) {
                skillEffectsString += forEach(skillEffect, dictionary[lang].skillEffectsDictionary);
                string += skillEffectsString;
                if (skillEffect.effect) {
                    effectString += forEach(skillEffect.effect, dictionary[lang].effectDictionary);
                    string += effectString;
                }
            }
        }
    }
    return string;
}

module.exports = function (filter, lang) {
    let string = "";
    let skillsString = lang === "ru" ? "\n- Скиллы -" : "\n- Skills -";
    let leaderSkillString = lang === "ru" ? "\n- Лидерка -" : "\n- Leader skill -";

    for (let key of Object.keys(filter)) {
        if (key === "skills") {
            skillsString += buildSkillsString(filter.skills, lang);
        } else if (key === "leaderSkill") {
            leaderSkillString += forEach(filter.leaderSkill, dictionary[lang].leaderSkillDictionary);
        } else {
            string += `\n${dictionary[lang].dictionary[key]}: ${filter[key]}`;
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