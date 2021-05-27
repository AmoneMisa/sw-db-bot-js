const dictionary = require('../../dictionaries/main');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');

module.exports = [["monsters.help", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    sendMessage(session, callback.message.chat.id, `/start - ${dictionary[session.language].help.message}\n\n` +
        `${dictionary[session.language].help.text}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Close",
                callback_data: "monsters.help.close"
            }]]
        }
    });
}], ["monsters.help.close", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];