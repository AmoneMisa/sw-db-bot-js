const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');

module.exports = [["monsters.filter.type.element", function (session, callback) {
    let buildKeyboard = (elements) => elements.map(element => ({
        text: element, callback_data: `monsters.filter.type.element.${element.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, "Выберите элемент", {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Fire", "Water", "Wind"]),
                buildKeyboard(["Light", "Dark"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.element\./, function (session, callback) {
    const [, element] = callback.data.match(/^monsters\.filter\.type\.element\.(.*)$/);
    session.filter.element = element;
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];