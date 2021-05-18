const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');
const dictionary = require('../dictionaries/mainDictionary');


module.exports = [["monsters.filter.type.skills.hits", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.hits.${skill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.hits}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["0", "1", "2"]),
                buildKeyboard(["3", "4", "5"]),
                buildKeyboard(["6", "7", "8"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.skills\.hits\./, function (session, callback) {
    const [, hits] = callback.data.match(/^monsters\.filter\.type\.skills\.hits\.(.*)$/);

    if (hits === "0" || hits === "1" || hits === "2" || hits === "3" || hits === "4" ||
        hits === "5" || hits === "6" || hits === "7" || hits === "8") {
        session.filter.skills[0].hits = parseInt(hits);
    }
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];