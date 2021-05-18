const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');

module.exports = [["monsters.filter.type.skills.effects.aoe", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, "Массовый или одиночный", {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Aoe",
                    callback_data: "monsters.filter.type.skills.effects.aoe.aoe"
                }],
                [{
                    text: "Single",
                    callback_data: "monsters.filter.type.skills.effects.aoe.single"
                }]
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.skills\.effects\.aoe\./, function (session, callback) {
    const [, aoe] = callback.data.match(/^monsters\.filter\.type\.skills\.effects\.aoe\.(.*)$/);
    session.filter.skills[0].effects[0].aoe = aoe === "aoe";
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];