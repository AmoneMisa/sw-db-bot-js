const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');

module.exports = [
    ["monsters.filter.type.is_fusion_food", function (session, callback) {
        let buildKeyboard = (stats) => stats.map(stat => ({
            text: stat, callback_data: `monsters.filter.type.is_fusion_food.${stat.toLowerCase()}`
        }));
        bot.sendMessage(callback.message.chat.id, "Является ли мобом для гекса", {
            reply_markup: {
                inline_keyboard: [
                    buildKeyboard(["Yes"]),
                    buildKeyboard(["No"])
                ]
            }
        });
        bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    }], [/^monsters\.filter\.type\.is_fusion_food\./, function (session, callback) {
        const [, isFusionFood] = callback.data.match(/^monsters\.filter\.type\.is_fusion_food\.(.*)$/);
        session.filter.isFusionFood = isFusionFood === "yes";
        updateFilter(session, callback);
        bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    }]
];