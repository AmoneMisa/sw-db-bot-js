const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.cooltime", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.cooltime.${skill.toLowerCase()}`
    }));

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.skills.cooltime}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["0", "1", "2", "3"]),
                buildKeyboard(["4", "5", "6", "7"]),
                buildKeyboard(["8", "9", "10", "11"]),
                buildKeyboard(["12", "13"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.skills\.cooltime\./, function (session, callback) {
    const [, cooltime] = callback.data.match(/^monsters\.filter\.type\.skills\.cooltime\.(.*)$/);

    if (cooltime === "0" || cooltime === "1" || cooltime === "2" || cooltime === "3" || cooltime === "4" ||
        cooltime === "5" || cooltime === "6" || cooltime === "7" || cooltime === "8" ||
        cooltime === "9" || cooltime === "10" || cooltime === "11" || cooltime === "12" || cooltime === "13") {
        session.filter.skills[0].cooltime = parseInt(cooltime);
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];