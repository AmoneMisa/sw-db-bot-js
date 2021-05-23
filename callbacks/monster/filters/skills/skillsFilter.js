const bot = require('../../../../bot');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.skills", function (session, callback) {
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

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.filter}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    }).then((msg) => {
        session.filter.skills = session.filter.skills || [{}];
        session.messages[3] = msg.message_id;
    });
}]];