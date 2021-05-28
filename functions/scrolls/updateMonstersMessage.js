const getMonstersMessage = require('./getMonstersMessage');
const bot = require('../../bot');

module.exports = function (session, callback) {
    if (!session.scrolls || !session.scrolls.listMessageId) {
        return;
    }

    let {text, form} = getMonstersMessage(session);

    bot.editMessageText(text, {
        ...form,
        chat_id: callback.message.chat.id,
        message_id: session.scrolls.listMessageId
    });
};