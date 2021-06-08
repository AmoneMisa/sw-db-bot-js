const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');
const buttonsDictionary = require('../../../../dictionaries/buttons');

module.exports = [["monsters.filter.type.stats", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let buildKeyboard = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.stats.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].attack, "attack"],
        [buttonsDictionary[session.language.buttons].defense, "defense"],
        [buttonsDictionary[session.language.buttons].hp, "hp"],
    ], [
        [buttonsDictionary[session.language.buttons].spd, "spd"],
        [buttonsDictionary[session.language.buttons].accuracy, "accuracy"]
    ], [
        [buttonsDictionary[session.language.buttons].resistance, "resistance"],
        [buttonsDictionary[session.language.buttons].criRate, "cri_rate"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.stats.filter}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}]];