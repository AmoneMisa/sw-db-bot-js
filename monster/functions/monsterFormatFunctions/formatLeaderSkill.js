module.exports = function (monster) {
    let leaderSkill = "";

    leaderSkill += `\nAttribute: ${monster.leaderSkill.attribute}
Amount: ${monster.leaderSkill.amount}%
Area: ${monster.leaderSkill.area}\n`;

    if (monster.leaderSkill.element) {
        leaderSkill += `Element: ${monster.leaderSkill.element}`;
    }
    return leaderSkill;
};