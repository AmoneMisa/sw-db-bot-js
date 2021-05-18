const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');
const dictionary = require('../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.skills.effects.chance", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.effects.chance.${skill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skillEffect.chance}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["0", "325", "165", "100"]),
                buildKeyboard(["90", "85", "80", "75"]),
                buildKeyboard(["70", "65", "60", "50"]),
                buildKeyboard(["40", "35", "30", "25"]),
                buildKeyboard(["20", "15", "10", "5", "3"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.skills\.effects\.chance\./, function (session, callback) {
    const [, chance] = callback.data.match(/^monsters\.filter\.type\.skills\.effects\.chance\.(.*)$/);
    let chances = ["0", "325", "165", "100", "90", "85", "80", "75", "70",
        "65", "60", "50", "40", "35", "30", "25", "20", "15", "10", "5", "3"];

    for (let _chance of chances) {
        if (chance === _chance) {
            session.filter.skills[0].effects[0].chance = parseInt(chance);
        }
    }
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];