const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.effects.damage", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.skillEffect.dmg}`, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Yes",
                    callback_data: "monsters.filter.type.skills.effects.damage.yes"
                }],
                [{
                    text: "Nope",
                    callback_data: "monsters.filter.type.skills.effects.damage.no"
                }]
            ]
        }
    });
}], [/^monsters\.filter\.type\.skills\.effects\.damage\./, function (session, callback) {
    const [, damage] = callback.data.match(/^monsters\.filter\.type\.skills\.effects\.damage\.(.*)$/);
    session.filter.skills[0].effects[0].damage = damage === "yes";
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];