const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.type", function (session, callback) {
    let buildKeyboard = (types) => types.map(type => ({
        text: type, callback_data: `monsters.filter.type.type.${type.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.type}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Support", "Attack", "Defense"]),
                buildKeyboard(["Hp", "Material"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.type\./, function (session, callback) {
    const [, type] = callback.data.match(/^monsters\.filter\.type\.type\.(.*)$/);
    session.filter.type = type;
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];