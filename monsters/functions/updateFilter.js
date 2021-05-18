const formatFilterString = require('../formatFilterString');
const bot = require('../../bot');
const dictionary = require('../../dictionaries/mainDictionary');

module.exports = function (session, callback) {
    let text = `${dictionary[session.language].update_filter} ${formatFilterString(session.filter, session.language)}`;

    if (session.info_message) {
        bot.editMessageText(text, {
            chat_id: session.info_message.chat.id,
            message_id: session.info_message.message_id
        });
    } else {
        bot.sendMessage(callback.message.chat.id, text)
            .then((msg) => session.info_message = msg);
    }
};