const bot = require('../../../../bot');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.skills", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.${skill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.filter}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Slot", "Cooltime", "Hits"]),
                buildKeyboard(["Passive", "Aoe"]),
                buildKeyboard(["Scales_with", "Effects"])
            ]
        }
    }).then(() => session.filter.skills = session.filter.skills || [{}]);
}]];