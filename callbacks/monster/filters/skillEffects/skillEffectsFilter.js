const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.effects", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    session.filter.skills[0].effects = session.filter.skills[0].effects || [{}];

    let buildKeyboard = (effects) => effects.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.effects.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].aoe, "aoe"],
        [buttonsDictionary[session.language.buttons].damage, "damage"]
    ], [
        [buttonsDictionary[session.language.buttons].chance, "chance"],
        [buttonsDictionary[session.language.buttons].effect, "effect"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.skillEffect.filter}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}]];