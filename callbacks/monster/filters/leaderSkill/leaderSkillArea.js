const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.leader_skill.area", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (leaderSkills) => leaderSkills.map(leaderSkill => ({
        text: leaderSkill, callback_data: `monsters.filter.type.leader_skill.area.${leaderSkill.toLowerCase()}`
    }));
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.leaderSkill.area}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["General", "Guild"]),
                buildKeyboard(["Dungeon", "Element", "Arena"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.leader_skill\.area\./, function (session, callback) {
    const [, area] = callback.data.match(/^monsters\.filter\.type\.leader_skill\.area\.(.*)$/);
    session.filter.leaderSkill.area = area;
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];