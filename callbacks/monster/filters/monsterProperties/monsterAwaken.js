const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.awaken", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.awaken}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: buttonsDictionary[session.language.buttons].awakenLevel1,
                callback_data: "monsters.filter.type.awaken.1"
            }, {
                text: buttonsDictionary[session.language.buttons].awakenLevel0,
                callback_data: "monsters.filter.type.awaken.0"
            }, {
                text: buttonsDictionary[session.language.buttons].awakenLevel2,
                callback_data: "monsters.filter.type.awaken.2"
            }]]
        }
    });
}], [/^monsters\.filter\.type\.awaken\./, function (session, callback) {
    const [, awakenLevel] = callback.data.match(/^monsters\.filter\.type\.awaken\.(.*)$/);

    if (awakenLevel === "0" || awakenLevel === "1" || awakenLevel === "2") {
        session.filter.awakenLevel = parseInt(awakenLevel);
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];