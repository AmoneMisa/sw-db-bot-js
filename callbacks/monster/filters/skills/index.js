const skillsFilter = require('./skillsFilter');
const skillsAoe = require('./skillsAoe');
const skillsSlot = require('./skillsSlot');
const skillsCooltime = require('./skillsCooltime');
const skillsHits = require('./skillsHits');
const skillsPassive = require('./skillsPassive');
const skillsScalesWith = require('./skillsScalesWith');

module.exports = [
    ...skillsFilter,
    ...skillsAoe,
    ...skillsSlot,
    ...skillsCooltime,
    ...skillsHits,
    ...skillsPassive,
    ...skillsScalesWith
];