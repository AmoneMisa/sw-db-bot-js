const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.skills.slot", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.slot.${skill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.slot}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["1", "2"]),
                buildKeyboard(["3", "4"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.skills\.slot\./, function (session, callback) {
    const [, slot] = callback.data.match(/^monsters\.filter\.type\.skills\.slot\.(.*)$/);

    if (slot === "1" || slot === "2" || slot === "3" || slot === "4") {
        session.filter.skills[0].slot = parseInt(slot);
    }
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];