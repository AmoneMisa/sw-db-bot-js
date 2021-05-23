const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.effects.effect.type", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let buildKeyboard = (effects) => effects.map(effect => ({
        text: effect, callback_data: `monsters.filter.type.skills.effects.effect.type.${effect.toLowerCase()}`
    }));
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.effect.type}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Buff"]),
                buildKeyboard(["Debuff"]),
                buildKeyboard(["Neutral"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.skills\.effects\.effect\.type\./, function (session, callback) {
    const [, type] = callback.data.match(/^monsters\.filter\.type\.skills\.effects\.effect\.type\.(.*)$/);
    session.filter.skills[0].effects[0].effect.type = type;
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];