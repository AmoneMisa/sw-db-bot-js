const formatSkills = require('./monsterFormatFunctions/formatSkills');
const formatLeaderSkill = require('./monsterFormatFunctions/formatLeaderSkill');

module.exports = function formatMonster(monster) {
    let str = `id: ${monster.id} | ${monster.name} | ${monster.element} | ${monster.baseStars}*\n
-- Stats -- 
Spd: ${monster.speed} | Atk: ${monster.maxAttack} | Def: ${monster.maxDefense}
Hp: ${monster.maxHp} | Cri rate: ${monster.criticalRate}%| Cri dmg: ${monster.criticalDamage}%
Resist: ${monster.resistance}% | Acc: ${monster.accuracy}%

-- Skills --${formatSkills(monster)}`;

    if (monster.leaderSkill) {
        str += `-- Leader Skill --${formatLeaderSkill(monster)}`;
    }

    return str;
};