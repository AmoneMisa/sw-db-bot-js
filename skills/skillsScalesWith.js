const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');
const dictionary = require('../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.skills.scales_with", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.scales_with.${skill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Defense"]),
                buildKeyboard(["Attack"]),
                buildKeyboard(["Spd"]),
                buildKeyboard(["HP"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.skills\.scales_with\./, function (session, callback) {
    const [, scalesWith] = callback.data.match(/^monsters\.filter\.type\.skills\.scales_with\.(.*)$/);
    session.filter.skills[0].scalesWith = scalesWith;
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];