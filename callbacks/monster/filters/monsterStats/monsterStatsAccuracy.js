const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.stats.accuracy", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stats.accuracy}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "0",
                callback_data: "monsters.filter.type.stats.accuracy.0"
            }, {
                text: "25%",
                callback_data: "monsters.filter.type.stats.accuracy.25"
            }]]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.stats\.accuracy\./, function (session, callback) {
    const [, accuracy] = callback.data.match(/^monsters\.filter\.type\.stats\.accuracy\.(.*)$/);

    if (accuracy === "0" || accuracy === "25") {
        session.filter.accuracy = parseInt(accuracy);
    }
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];