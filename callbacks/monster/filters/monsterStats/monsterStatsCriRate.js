const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.stats.cri_rate", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.stats.criRate}`, {
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
}], [/^monsters\.filter\.type\.stats\.cri_rate\./, function (session, callback) {
    const [, crir] = callback.data.match(/^monsters\.filter\.type\.stats\.cri_rate\.(.*)$/);

    if (crir === "15" || crir === "30") {
        session.filter.criticalRate = parseInt(crir);
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];