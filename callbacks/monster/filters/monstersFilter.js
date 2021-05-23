const bot = require('../../../bot');
const dictionary = require('../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter", function (session, callback) {
    session.filter = session.filter || {};
    let buildKeyboard = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.${callback}`
    }));

    let buttons = [[
        ["Name", "filter.type.name"],
        ["Element", "filter.type.element"],
        ["Awaken", "filter.type.awaken"]
    ], [
        ["Archetype", "filter.type.type"],
        ["Base stars", "filter.type.base_stars"],
        ["Leader skill", "filter.type.leader_skill"]
    ], [
        ["Stats", "filter.type.stats"],
        ["Skills", "filter.type.skills"],
        ["Is fusion food", "filter.type.is_fusion_food"]
    ], [
        ["Reset", "reset"]
    ]].map(buildKeyboard);

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].filter}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}]];