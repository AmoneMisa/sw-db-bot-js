const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.stats.resistance", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.stats.resistance}`, {
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
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
}], [/^monsters\.filter\.type\.stats\.resistance\./, function (session, callback) {
    const [, resistance] = callback.data.match(/^monsters\.filter\.type\.stats\.resistance\.(.*)$/);

    if (resistance === "15" || resistance === "40") {
        session.filter.resistance = parseInt(resistance);
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];