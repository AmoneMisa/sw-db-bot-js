const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [
    ["monsters.filter.type.skills.effects.effect", function (session, callback) {
        deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
        session.filter.skills[0].effects[0].effect = session.filter.skills[0].effects[0].effect || {};
        let buildKeyboard = (effects) => effects.map(([text, callback]) => ({
            text: text, callback_data: `monsters.filter.type.skills.effects.effect.${callback}`
        }));

        let buttons = [[
            [buttonsDictionary[session.language.buttons].name, "name"]
        ], [
            [buttonsDictionary[session.language.buttons].type, "type"]
        ]].map(buildKeyboard);

        sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.effect.filter}`, {
            reply_markup: {
                inline_keyboard: buttons
            }
        });
    }]
];