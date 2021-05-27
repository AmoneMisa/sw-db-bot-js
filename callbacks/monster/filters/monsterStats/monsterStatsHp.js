const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.stats.hp", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.stats.hp.filter}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Greater than",
                callback_data: "monsters.filter.type.stats.hp.gte"
            }, {
                text: "Less than",
                callback_data: "monsters.filter.type.stats.hp.lte"
            }]]
        }
    });
}], ["monsters.filter.type.stats.hp.gte", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.stats.hp.gte}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.maxHpGte = msg.text;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
        });
    });
}], ["monsters.filter.type.stats.hp.lte", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.stats.hp.lte}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.maxHpLte = msg.text;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
        });
    });
}]];