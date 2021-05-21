const bot = require('../bot');
const formatMonster = require('./format/formatMonster');

module.exports = function (chatId, monster) {
    bot.sendPhoto(chatId,
        `https://swarfarm.com/static/herders/images/monsters/${monster.imageFilename}`,
        {
            photo: {
                photoSize: {
                    width: 50,
                    height: 50
                }
            }
        }).then(() => {
            bot.sendMessage(chatId, formatMonster(monster));
        }
    );
};