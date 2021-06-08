const dictionary = require('../../dictionaries/main');
const buttonsDictionary = require('../../dictionaries/buttons');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');

module.exports = [["monsters.help", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    sendMessage(session, callback.message.chat.id, `/start - ${dictionary[session.language.text].help.message}\n\n` +
        `${dictionary[session.language.text].help.text}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: buttonsDictionary[session.language.buttons].close,
                callback_data: "monsters.help.close"
            }]]
        }
    });
}], ["monsters.help.close", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];