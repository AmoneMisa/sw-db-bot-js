const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');

module.exports = [["monsters.filter.type.archetype", function (session, callback) {
    let buildKeyboard = (types) => types.map(type => ({
        text: type, callback_data: `monsters.filter.type.archetype.${type.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, "Выберите тип монстра", {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Support", "Attack", "Defense"]),
                buildKeyboard(["Hp", "Material"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.archetype\./, function (session, callback) {
    const [, type] = callback.data.match(/^monsters\.filter\.type\.archetype\.(.*)$/);
    session.filter.type = type;
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];