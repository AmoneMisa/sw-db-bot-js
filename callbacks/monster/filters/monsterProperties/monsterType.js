const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.type", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard = (types) => types.map(type => ({
        text: type, callback_data: `monsters.filter.type.type.${type.toLowerCase()}`
    }));
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.type}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Support", "Attack", "Defense"]),
                buildKeyboard(["Hp", "Material"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.type\./, function (session, callback) {
    const [, type] = callback.data.match(/^monsters\.filter\.type\.type\.(.*)$/);
    session.filter.type = type;
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];