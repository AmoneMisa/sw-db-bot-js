const monstersMain = require('./monstersMain');
const monstersFilter = require('./monstersFilter');
const monstersReset = require('./monstersReset');
const monstersResult = require('./monstersResult');
const monstersById = require('./monstersById');
const monsterHelp = require('./monsterHelp');
const monsterLanguage = require('./monsterLanguage');

module.exports = [
    ...monstersMain,
    ...monstersFilter,
    ...monstersReset,
    ...monstersResult,
    ...monstersById,
    ...monsterHelp,
    ...monsterLanguage
];