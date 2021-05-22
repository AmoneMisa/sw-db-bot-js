const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.stats.spd", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stats.speed.filter}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Greater than",
                callback_data: "monsters.filter.type.stats.spd.gte"
            }, {
                text: "Less than",
                callback_data: "monsters.filter.type.stats.spd.lte"
            }]]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], ["monsters.filter.type.stats.spd.gte", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stats.speed.gte}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.speedGte = msg.text;
            session.messages[5] = callback.message.message_id;
            bot.removeReplyListener(id);
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
            bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    });
    updateFilter(session, callback);
}], ["monsters.filter.type.stats.spd.lte", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stats.speed.lte}`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.speedLte = msg.text;
            session.messages[5] = callback.message.message_id;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
            bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    });
}]];