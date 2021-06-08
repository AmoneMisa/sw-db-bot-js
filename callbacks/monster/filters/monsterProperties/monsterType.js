const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.type", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard = (types) => types.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.type.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].support, "support"],
        [buttonsDictionary[session.language.buttons].attack, "attack"],
        [buttonsDictionary[session.language.buttons].defense, "defense"]
    ], [
        [buttonsDictionary[session.language.buttons].hp, "hp"],
        [buttonsDictionary[session.language.buttons].material, "material"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.type}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.filter\.type\.type\./, function (session, callback) {
    const [, type] = callback.data.match(/^monsters\.filter\.type\.type\.(.*)$/);
    session.filter.type = type;
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];