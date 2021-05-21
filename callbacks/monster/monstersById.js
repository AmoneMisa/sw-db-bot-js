const bot = require('../../bot');
const fetchMonsterById = require('../../functions/fetch/fetchMonsterById');
const dictionary = require('../../dictionaries/mainDictionary');
const sendMonster = require('../../functions/sendMonster');

module.exports = [["monsters.by_id", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monstersById}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            bot.removeReplyListener(id);
            fetchMonsterById(msg.text)
                .then((r) => {
                    sendMonster(msg.chat.id, r.data);
                    bot.deleteMessage(msg.chat.id, msg.message_id);
                    bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
                    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
                });
        });
    });
}]];