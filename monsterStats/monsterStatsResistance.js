const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');

module.exports = [["monsters.filter.type.stats.resistance", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, "Выберите значение.", {
        reply_markup: {
            inline_keyboard: [[{
                text: "15%",
                callback_data: "monsters.filter.type.stats.resistance.15"
            }, {
                text: "40%",
                callback_data: "monsters.filter.type.stats.resistance.40"
            }]]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.stats\.resistance\./, function (session, callback) {
    const [, resistance] = callback.data.match(/^monsters\.filter\.type\.stats\.resistance\.(.*)$/);

    if (resistance === "15" || resistance === "40") {
        session.filter.resistance = parseInt(resistance);
    }
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];