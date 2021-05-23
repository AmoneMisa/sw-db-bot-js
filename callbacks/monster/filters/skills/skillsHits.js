const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.hits", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.hits.${skill.toLowerCase()}`
    }));

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.skills.hits}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["0", "1", "2"]),
                buildKeyboard(["3", "4", "5"]),
                buildKeyboard(["6", "7", "8"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.skills\.hits\./, function (session, callback) {
    const [, hits] = callback.data.match(/^monsters\.filter\.type\.skills\.hits\.(.*)$/);

    if (hits === "0" || hits === "1" || hits === "2" || hits === "3" || hits === "4" ||
        hits === "5" || hits === "6" || hits === "7" || hits === "8") {
        session.filter.skills[0].hits = parseInt(hits);
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];