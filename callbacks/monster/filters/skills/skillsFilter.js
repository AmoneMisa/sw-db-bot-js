const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.filter.skills = session.filter.skills || [{}];

    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.${callback}`
    }));

    let buttons = [[
        ["Slot", "slot"],
        ["Cooltime", "cooltime"],
        ["Hits", "hits"]
    ], [
        ["Passive", "passive"],
        ["Aoe", "aoe"]
    ], [
        ["Scales with", "scales_with"],
        ["Effects", "effects"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.skills.filter}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}]];