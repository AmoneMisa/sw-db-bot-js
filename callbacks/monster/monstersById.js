const bot = require('../../bot');
const fetchMonsterById = require('../../functions/monsters/fetch/fetchMonsterById');
const dictionary = require('../../dictionaries/mainDictionary');
const sendMonster = require('../../functions/monsters/sendMonster');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');

module.exports = [["monsters.by_id", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monstersById}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            bot.removeReplyListener(id);
            fetchMonsterById(msg.text)
                .then((r) => {
                    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
                    sendMonster(session, msg.chat.id, r.data);
                })
                .catch((e) => {
                    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
                    if (e.response && (e.response.status === 400 || e.response.status === 404)) {
                        sendMessage(session, callback.message.chat.id, "Моба с таким id не найдено", {
                            reply_markup: {
                                inline_keyboard: [[{
                                    text: "Close",
                                    callback_data: "monsters.by_id.close"
                                }]]
                            }
                        });
                        return;
                    }
                    console.error(e);
                });
        });
    });
}], ["monsters.by_id.close", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];