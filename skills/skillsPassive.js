const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');
const dictionary = require('../dictionaries/mainDictionary');

module.exports = [ ["monsters.filter.type.skills.passive", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.passive.${skill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.passive}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Passive"]),
                buildKeyboard(["Active"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.skills\.passive\./, function (session, callback) {
    const [, passive] = callback.data.match(/^monsters\.filter\.type\.skills\.passive\.(.*)$/);
    session.filter.skills[0].passive = passive === "passive";
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];