const monsterStatsFilter = require('./monsterStatsFilter');
const monsterStatsAttack = require('./monsterStatsAttack');
const monsterStatsDefense = require('./monsterStatsDefense');
const monsterStatsHp = require('./monsterStatsHp');
const monsterStatsSpd = require('./monsterStatsSpd');
const monsterStatsAccuracy = require('./monsterStatsAccuracy');
const monsterStatsResistance = require('./monsterStatsResistance');
const monsterStatsCriRate = require('./monsterStatsCriRate');

module.exports = [
    ...monsterStatsFilter,
    ...monsterStatsAttack,
    ...monsterStatsDefense,
    ...monsterStatsHp,
    ...monsterStatsSpd,
    ...monsterStatsAccuracy,
    ...monsterStatsResistance,
    ...monsterStatsCriRate
];