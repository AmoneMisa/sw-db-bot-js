module.exports = function formatMonsterItem(monster) {
    return `id: ${monster.id} | ${monster.name} | ${monster.element} | ${monster.baseStars}*`;
};