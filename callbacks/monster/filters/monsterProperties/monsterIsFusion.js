const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.is_fusion_food", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard = (stats) => stats.map(stat => ({
        text: stat, callback_data: `monsters.filter.type.is_fusion_food.${stat.toLowerCase()}`
    }));
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.fusion}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Yes"]),
                buildKeyboard(["No"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.is_fusion_food\./, function (session, callback) {
    const [, isFusionFood] = callback.data.match(/^monsters\.filter\.type\.is_fusion_food\.(.*)$/);
    session.filter.isFusionFood = isFusionFood === "yes";
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];