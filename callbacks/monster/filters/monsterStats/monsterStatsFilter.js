const bot = require('../../../../bot');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.stats", function (session, callback) {
    let buildKeyboard = (stats) => stats.map(stat => ({
        text: stat, callback_data: `monsters.filter.type.stats.${stat.toLowerCase()}`
    }));
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stats.filter}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Attack", "Defense", "Hp"]),
                buildKeyboard(["Spd", "Accuracy"]),
                buildKeyboard(["Resistance", "Cri_rate"])
            ]
        }
    });
}]];