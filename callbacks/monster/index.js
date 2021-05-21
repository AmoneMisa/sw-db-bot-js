const monstersFilter = require('./filters');
const monsterHelp = require('./monsterHelp');
const monstersById = require('./monstersById');
const monstersMain = require('./monstersMain');
const monstersReset = require('./monstersReset');
const monstersResult = require('./monstersResult');

module.exports = [
    ...monstersMain,
    ...monstersFilter,
    ...monstersReset,
    ...monstersResult,
    ...monstersById,
    ...monsterHelp
];