const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.stats.accuracy", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.stats.accuracy}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "0",
                callback_data: "monsters.filter.type.stats.accuracy.0"
            }, {
                text: "25%",
                callback_data: "monsters.filter.type.stats.accuracy.25"
            }]]
        }
    });
}], [/^monsters\.filter\.type\.stats\.accuracy\./, function (session, callback) {
    const [, accuracy] = callback.data.match(/^monsters\.filter\.type\.stats\.accuracy\.(.*)$/);

    if (accuracy === "0" || accuracy === "25") {
        session.filter.accuracy = parseInt(accuracy);
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];