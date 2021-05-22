const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.stats.defense", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stats.defense.filter}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Greater than",
                callback_data: "monsters.filter.type.stats.defense.gte"
            }, {
                text: "Less than",
                callback_data: "monsters.filter.type.stats.defense.lte"
            }]]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], ["monsters.filter.type.stats.defense.gte", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stats.defense.gte}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.maxDefenseGte = msg.text;
            session.messages[5] = callback.message.message_id;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
            bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    });
}], ["monsters.filter.type.stats.defense.lte", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stats.defense.lte}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.maxDefenseLte = msg.text;
            session.messages[5] = callback.message.message_id;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
            bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    });
}]];