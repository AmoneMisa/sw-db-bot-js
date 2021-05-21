const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.stats.cri_rate", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stats.criRate}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "15%",
                callback_data: "monsters.filter.type.stats.cri_rate.15"
            }, {
                text: "30%",
                callback_data: "monsters.filter.type.stats.cri_rate.30"
            }]]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.stats\.cri_rate\./, function (session, callback) {
    const [, crir] = callback.data.match(/^monsters\.filter\.type\.stats\.cri_rate\.(.*)$/);

    if (crir === "15" || crir === "30") {
        session.filter.criticalRate = parseInt(crir);
    }
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];