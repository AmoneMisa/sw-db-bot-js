const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.leader_skill", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.filter.leaderSkill = session.filter.leaderSkill || {};
    let buildKeyboard = (leaderSkills) => leaderSkills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.leader_skill.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].attribute, "attribute"],
        [buttonsDictionary[session.language.buttons].amount, "amount"]
    ], [
        [buttonsDictionary[session.language.buttons].area, "area"],
        [buttonsDictionary[session.language.buttons].element, "element"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.leaderSkill.filter}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}]];