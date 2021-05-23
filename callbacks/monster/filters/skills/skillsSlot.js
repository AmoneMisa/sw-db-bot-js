const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.slot", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages , callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.slot.${skill.toLowerCase()}`
    }));
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.skills.slot}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["1", "2"]),
                buildKeyboard(["3", "4"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.skills\.slot\./, function (session, callback) {
    const [, slot] = callback.data.match(/^monsters\.filter\.type\.skills\.slot\.(.*)$/);

    if (slot === "1" || slot === "2" || slot === "3" || slot === "4") {
        session.filter.skills[0].slot = parseInt(slot);
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];