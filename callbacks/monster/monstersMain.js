const dictionary = require('../../dictionaries/mainDictionary');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');

module.exports = [["monsters", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    return sendMessage(session, callback.message.chat.id, `${dictionary[session.language].main}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Filter",
                callback_data: "monsters.filter"
            }, {
                text: "Help",
                callback_data: "monsters.help"
            }], [{
                text: "Reset",
                callback_data: "monsters.reset"
            }, {
                text: "Get result",
                callback_data: "monsters.result"
            }]]
        }
    });
}]];