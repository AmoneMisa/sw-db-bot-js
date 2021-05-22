const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.awaken", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.awaken}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Awaken",
                callback_data: "monsters.filter.type.awaken.1"
            }, {
                text: "Non-awaken",
                callback_data: "monsters.filter.type.awaken.0"
            }, {
                text: "2-nd Awaken",
                callback_data: "monsters.filter.type.awaken.2"
            }]]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.awaken\./, function (session, callback) {
    const [, awakenLevel] = callback.data.match(/^monsters\.filter\.type\.awaken\.(.*)$/);

    if (awakenLevel === "0" || awakenLevel === "1" || awakenLevel === "2") {
        session.filter.awakenLevel = parseInt(awakenLevel);
    }
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]
];