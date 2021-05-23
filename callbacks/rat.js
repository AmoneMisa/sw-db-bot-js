const deleteMessage = require('../functions/deleteMessage');
const bot = require('../bot');

module.exports = [["rat", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);

    return bot.sendSticker(callback.message.chat.id, "CAACAgIAAxkBAAIWl2Cqg_3KHzusKubqscU7FRz0d4HFAAKyAAMQIQIQU0i6-SiGGyYfBA")
        .then(msg => {
            session.messages.push(msg.message_id);
        });
}]];