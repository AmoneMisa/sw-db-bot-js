const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.leader_skill.element", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (leaderSkills) => leaderSkills.map(leaderSkill => ({
        text: leaderSkill, callback_data: `monsters.filter.type.leader_skill.element.${leaderSkill.toLowerCase()}`
    }));
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.leaderSkill.element}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Fire", "Water", "Wind"]),
                buildKeyboard(["Light", "Dark"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.leader_skill\.element\./, function (session, callback) {
    const [, element] = callback.data.match(/^monsters\.filter\.type\.leader_skill\.element\.(.*)$/);
    session.filter.leaderSkill.element = element;
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];