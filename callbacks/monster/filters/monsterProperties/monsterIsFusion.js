const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.is_fusion_food", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard = (stats) => stats.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.is_fusion_food.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].yes, "yes"]
    ], [
        [buttonsDictionary[session.language.buttons].no, "no"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.fusion}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.filter\.type\.is_fusion_food\./, function (session, callback) {
    const [, isFusionFood] = callback.data.match(/^monsters\.filter\.type\.is_fusion_food\.(.*)$/);
    session.filter.isFusionFood = isFusionFood === "yes";
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];