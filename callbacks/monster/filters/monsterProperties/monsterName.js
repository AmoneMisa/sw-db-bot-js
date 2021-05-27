const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.name", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.name}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.name = msg.text;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
        });
    });
}]];