const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.effects", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    session.filter.skills[0].effects = session.filter.skills[0].effects || [{}];
    let buildKeyboard = (effects) => effects.map(effect => ({
        text: effect, callback_data: `monsters.filter.type.skills.effects.${effect.toLowerCase()}`
    }));

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.skillEffect.filter}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Aoe", "Damage"]),
                buildKeyboard(["Chance", "Effect",])
            ]
        }
    });
}]];