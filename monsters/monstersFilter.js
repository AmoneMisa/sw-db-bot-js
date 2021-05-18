const bot = require('../bot');
const dictionary = require('../dictionaries/mainDictionary');

module.exports = [["monsters.filter", function (session, callback) {
    session.filter = session.filter || {};
    let buildKeyboard = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.${callback}`
    }));

    let buttons = [[
        ["Name", "name"],
        ["Element", "element"],
        ["Awaken", "awaken"]
    ], [
        ["Archetype", "type"],
        ["Base stars", "base_stars"],
        ["Leader skill", "leader_skill"]
    ], [
        ["Stats", "stats"],
        ["Skills", "skills"],
        ["Is fusion food", "is_fusion_food"]
    ]].map(buildKeyboard);

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].filter}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}]];