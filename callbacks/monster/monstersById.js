const bot = require('../../bot');
const fetchMonsterById = require('../../functions/monsters/fetch/fetchMonsterById');
const dictionary = require('../../dictionaries/main');
const sendMonster = require('../../functions/monsters/sendMonster');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');
const formatSkill = require('../../functions/monsters/format/formatSkill');

module.exports = [["monsters.by_id", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monstersById.message}`, {
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
                        bot.sendSticker(callback.message.chat.id, "CAACAgIAAxkBAAIWl2Cqg_3KHzusKubqscU7FRz0d4HFAAKyAAMQIQIQU0i6-SiGGyYfBA")
                            .then(msg => {
                                session.messages.push(msg.message_id);
                            });
                        sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monstersById.error}`, {
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
}], [/^monsters\.by_id\.skill\./, function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    const [, skillIndex] = callback.data.match(/^monsters\.by_id\.skill\.(.*)$/);
    if (!session.monster || !session.monster.skills[skillIndex]) {
        return;
    }

    let skill = session.monster.skills[skillIndex];
    sendMessage(session, callback.message.chat.id, formatSkill(skill));
}]];