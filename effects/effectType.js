const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');


module.exports = [["monsters.filter.type.skills.effects.effect.type", function (session, callback) {
    let buildKeyboard = (effects) => effects.map(effect => ({
        text: effect, callback_data: `monsters.filter.type.skills.effects.effect.type.${effect.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, "Выберите тип эффекта", {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Buff"]),
                buildKeyboard(["Debuff"]),
                buildKeyboard(["Neutral"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.skills\.effects\.effect\.type\./, function (session, callback) {
    const [, type] = callback.data.match(/^monsters\.filter\.type\.skills\.effects\.effect\.type\.(.*)$/);
    session.filter.skills[0].effects[0].effect.type = type;
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];