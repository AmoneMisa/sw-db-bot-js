const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');

module.exports = [["monsters.filter.type.stats.spd", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, "Выберите тип значения.", {
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
    bot.sendMessage(callback.message.chat.id, "Искать значение больше, чем", {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.speedGte = msg.text;
            bot.removeReplyListener(id);
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
            bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    });
    updateFilter(session, callback);
}], ["monsters.filter.type.stats.spd.lte", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, "Искать значение меньше, чем", {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.speedLte = msg.text;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
            bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    });
}]];