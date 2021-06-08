const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.stats.defense", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.stats.defense.filter}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: buttonsDictionary[session.language.buttons].gte,
                callback_data: "monsters.filter.type.stats.defense.gte"
            }, {
                text: buttonsDictionary[session.language.buttons].lte,
                callback_data: "monsters.filter.type.stats.defense.lte"
            }]]
        }
    });
}], ["monsters.filter.type.stats.defense.gte", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.stats.defense.gte}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.maxDefenseGte = msg.text;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
        });
    });
}], ["monsters.filter.type.stats.defense.lte", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.stats.defense.lte}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.maxDefenseLte = msg.text;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
        });
    });
}]];