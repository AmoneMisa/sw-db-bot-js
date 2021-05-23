const dictionary = require('../../../../dictionaries/mainDictionary');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [
    ["monsters.filter.type.skills.effects.effect", function (session, callback) {
        deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
        session.filter.skills[0].effects[0].effect = session.filter.skills[0].effects[0].effect || {};
        let buildKeyboard = (effects) => effects.map(effect => ({
            text: effect, callback_data: `monsters.filter.type.skills.effects.effect.${effect.toLowerCase()}`
        }));

        sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.effect.filter}`, {
            reply_markup: {
                inline_keyboard: [
                    buildKeyboard(["Name"]),
                    buildKeyboard(["Type"])
                ]
            }
        });
    }]
];