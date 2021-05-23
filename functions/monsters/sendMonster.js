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
            session.monster = monster;

            let buttons = [];
            let row;
            let countInRow = monster.skills.length === 4 ? 2 : 3;

            for (let i = 0; i < monster.skills.length; i++) {
                if (i % countInRow === 0) {
                    row = [];
                    buttons.push(row);
                }

                row.push({text: `Skill ${i + 1}`, callback_data: `monsters.by_id.skill.${i}`});
            }

            sendMessage(session, chatId, formatMonster(monster), {
                reply_markup: {
                    inline_keyboard: [
                        ...buttons,
                        [{
                        text: "Close",
                        callback_data: "monsters.by_id.close"
                    }]]
                }
            });
        });
};