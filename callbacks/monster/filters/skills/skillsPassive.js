const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [ ["monsters.filter.type.skills.passive", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.passive.${skill.toLowerCase()}`
    }));
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.skills.passive}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Passive"]),
                buildKeyboard(["Active"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.skills\.passive\./, function (session, callback) {
    const [, passive] = callback.data.match(/^monsters\.filter\.type\.skills\.passive\.(.*)$/);
    session.filter.skills[0].passive = passive === "passive";
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];