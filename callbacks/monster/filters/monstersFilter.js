const dictionary = require('../../../dictionaries/main');
const buttonsDictionary = require('../../../dictionaries/buttons');
const sendMessage = require('../../../functions/sendMessage');
const deleteMessage = require('../../../functions/deleteMessage');

module.exports = [["monsters.filter", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.filter = session.filter || {};
    let buildKeyboard = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].name, "filter.type.name"],
        [buttonsDictionary[session.language.buttons].element, "filter.type.element"],
        [buttonsDictionary[session.language.buttons].awaken, "filter.type.awaken"]
    ], [
        [buttonsDictionary[session.language.buttons].type, "filter.type.type"],
        [buttonsDictionary[session.language.buttons].baseStars, "filter.type.base_stars"],
        [buttonsDictionary[session.language.buttons].leaderSkill, "filter.type.leader_skill"]
    ], [
        [buttonsDictionary[session.language.buttons].stats, "filter.type.stats"],
        [buttonsDictionary[session.language.buttons].skills, "filter.type.skills"],
        [buttonsDictionary[session.language.buttons].isFusionFood, "filter.type.is_fusion_food"]
    ], [
        [buttonsDictionary[session.language.buttons].reset, "reset"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].filter}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}]];