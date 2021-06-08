const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.effects.aoe", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.skillEffect.aoe}`, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: buttonsDictionary[session.language.buttons].aoe,
                    callback_data: "monsters.filter.type.skills.effects.aoe.aoe"
                }],
                [{
                    text: buttonsDictionary[session.language.buttons].single,
                    callback_data: "monsters.filter.type.skills.effects.aoe.single"
                }]
            ]
        }
    });
}], [/^monsters\.filter\.type\.skills\.effects\.aoe\./, function (session, callback) {
    const [, aoe] = callback.data.match(/^monsters\.filter\.type\.skills\.effects\.aoe\.(.*)$/);
    session.filter.skills[0].effects[0].aoe = aoe === "aoe";
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];