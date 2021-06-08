const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.effects.effect.type", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let buildKeyboard = (effects) => effects.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.effects.effect.type.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].buff, "buff"]
    ], [
        [buttonsDictionary[session.language.buttons].debuff, "debuff"]
    ], [
        [buttonsDictionary[session.language.buttons].neutral, "neutral"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.effect.type}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.filter\.type\.skills\.effects\.effect\.type\./, function (session, callback) {
    const [, type] = callback.data.match(/^monsters\.filter\.type\.skills\.effects\.effect\.type\.(.*)$/);
    session.filter.skills[0].effects[0].effect.type = type;
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];