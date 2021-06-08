const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.filter.skills = session.filter.skills || [{}];

    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].slot, "slot"],
        [buttonsDictionary[session.language.buttons].cooltime, "cooltime"],
        [buttonsDictionary[session.language.buttons].hits, "hits"]
    ], [
        [buttonsDictionary[session.language.buttons].passive, "passive"],
        [buttonsDictionary[session.language.buttons].aoe, "aoe"]
    ], [
        [buttonsDictionary[session.language.buttons].scalesWith, "scales_with"],
        [buttonsDictionary[session.language.buttons].effects, "effects"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.skills.filter}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}]];