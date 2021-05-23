const formatLeaderSkill = require('./formatLeaderSkill');

module.exports = function formatMonster(monster) {
    let str = `id: ${monster.id} | ${monster.name} | ${monster.element} | ${monster.baseStars}*\n
-- Stats -- 
Spd: ${monster.speed} | Atk: ${monster.maxAttack} | Def: ${monster.maxDefense}
Hp: ${monster.maxHp} | Cri rate: ${monster.criticalRate}%| Cri dmg: ${monster.criticalDamage}%
Resist: ${monster.resistance}% | Acc: ${monster.accuracy}%\n\n`;

    if (monster.leaderSkill) {
        str += `-- Leader Skill --\n${formatLeaderSkill(monster)}`;
    }

    return str;
};