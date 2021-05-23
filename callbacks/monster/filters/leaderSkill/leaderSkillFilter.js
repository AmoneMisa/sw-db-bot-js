const dictionary = require('../../../../dictionaries/mainDictionary');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.leader_skill", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.filter.leaderSkill = session.filter.leaderSkill || {};
    let buildKeyboard = (leaderSkills) => leaderSkills.map(leaderSkill => ({
        text: leaderSkill, callback_data: `monsters.filter.type.leader_skill.${leaderSkill.toLowerCase()}`
    }));

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.leaderSkill.filter}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Attribute", "Amount"]),
                buildKeyboard(["Area", "Element"])
            ]
        }
    });
}]];