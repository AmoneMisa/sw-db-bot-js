const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');
const getResult = require('../../functions/monsters/getResult');

module.exports = [["monsters", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    return getResult(session)
        .then(({text, form}) => {

            return sendMessage(session, callback.message.chat.id, text, form);
        }).then(msg => {
            session.monstersMessageId = msg.message_id;
        });
}]];