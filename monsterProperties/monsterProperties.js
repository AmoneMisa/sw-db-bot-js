const monsterAwaken = require('./monsterAwaken');
const monsterElement = require('./monsterElement');
const monsterIsFusion = require('./monsterIsFusion');
const monsterName = require('./monsterName');
const monsterStars = require('./monsterStars');
const monsterType = require('./monsterType');

module.exports = [
    ...monsterAwaken,
    ...monsterElement,
    ...monsterIsFusion,
    ...monsterName,
    ...monsterStars,
    ...monsterType
];