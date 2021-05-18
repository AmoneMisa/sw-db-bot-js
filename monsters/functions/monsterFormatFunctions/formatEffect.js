module.exports = function (effect) {
    if (!effect) {
        return;
    }
    return `Name: ${effect.name} | Type: ${effect.type}\n`;
};