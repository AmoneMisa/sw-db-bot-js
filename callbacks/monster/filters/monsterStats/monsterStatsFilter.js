const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.stats", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let buildKeyboard = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.stats.${callback}`
    }));

    let buttons = [[
        ["Attack", "attack"],
        ["Defense", "defense"],
        ["HP", "hp"],
    ], [
        ["Speed", "spd"],
        ["Accuracy", "accuracy"]
    ], [
        ["Resistance", "resistance"],
        ["Critical Rate", "cri_rate"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.stats.filter}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}]];