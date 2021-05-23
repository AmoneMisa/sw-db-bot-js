module.exports = function (monster) {
    let leaderSkill = "";

    leaderSkill += `Attribute: ${monster.leaderSkill.attribute}
Amount: ${monster.leaderSkill.amount}%
Area: ${monster.leaderSkill.area}\n`;

    if (monster.leaderSkill.element) {
        leaderSkill += `Element: ${monster.leaderSkill.element}\n`;
    }
    return leaderSkill;
};