const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.aoe", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.aoe.${skill.toLowerCase()}`
    }));

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.skills.aoe}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Aoe"]),
                buildKeyboard(["Single"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.skills\.aoe\./, function (session, callback) {
    const [, aoe] = callback.data.match(/^monsters\.filter\.type\.skills\.aoe\.(.*)$/);
    session.filter.skills[0].aoe = aoe === "aoe";
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];