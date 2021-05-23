const bot = require('../../bot');
const formatMonster = require('./format/formatMonster');
const sendMessage = require('../../functions/sendMessage');

module.exports = function (session, chatId, monster) {
    bot.sendPhoto(chatId,
        `https://swarfarm.com/static/herders/images/monsters/${monster.imageFilename}`,
        {
            photo: {
                photoSize: {
                    width: 50,
                    height: 50
                }
            }
        })
        .then((msg) => {
            session.messages.push(msg.message_id);
            sendMessage(session, chatId, formatMonster(monster), {
                reply_markup: {
                    inline_keyboard: [[{
                        text: "Close",
                        callback_data: "monsters.by_id.close"
                    }]]
                }
            });
        });
};