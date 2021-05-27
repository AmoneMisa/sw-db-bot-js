const bot = require('../../bot');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');

module.exports = [["scrolls.count", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    sendMessage(session, callback.message.chat.id, "How much summons do you want?", {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.scrolls.counter = msg.text || 1;
            bot.removeReplyListener(id);
            deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
        });
    });
}]];