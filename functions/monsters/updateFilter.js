const getResult = require('./getResult');
const bot = require('../../bot');

module.exports = function (session, callback) {
    if (!session.monstersMessageId) {
        return;
    }

    session.page = 0;

    return getResult(session)
        .then(({text, form}) => {
            bot.editMessageText(text, {
                ...form,
                chat_id: callback.message.chat.id,
                message_id: session.monstersMessageId
            });
        });
};