const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.leader_skill.attribute", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (leaderSkills) => leaderSkills.map(leaderSkill => ({
        text: leaderSkill, callback_data: `monsters.filter.type.leader_skill.attribute.${leaderSkill.toLowerCase()}`
    }));
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.leaderSkill.attribute}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Attack", "Defense", "Hp"]),
                buildKeyboard(["Speed", "Critical_rate"]),
                buildKeyboard(["Accuracy", "Resistance",])
            ]
        }
    });
}], [/^monsters\.filter\.type\.leader_skill\.attribute\./, function (session, callback) {
    const [, attribute] = callback.data.match(/^monsters\.filter\.type\.leader_skill\.attribute\.(.*)$/);

    if (attribute === "attack") {
        session.filter.leaderSkill.attribute = "Attack Power";
    } else if (attribute === "speed") {
        session.filter.leaderSkill.attribute = "Attack Speed";
    } else if (attribute === "critical_rate") {
        session.filter.leaderSkill.attribute = "Critical Rate";
    } else {
        session.filter.leaderSkill.attribute = attribute;
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];