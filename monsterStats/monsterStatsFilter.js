const bot = require('../bot');

module.exports = [["monsters.filter.type.stats", function (session, callback) {
    let buildKeyboard = (stats) => stats.map(stat => ({
        text: stat, callback_data: `monsters.filter.type.stats.${stat.toLowerCase()}`
    }));
    bot.sendMessage(callback.message.chat.id, "Выберите стат для фильтрации", {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Attack", "Defense", "Hp"]),
                buildKeyboard(["Spd", "Accuracy"]),
                buildKeyboard(["Resistance", "Cri_rate"])
            ]
        }
    });
}]];