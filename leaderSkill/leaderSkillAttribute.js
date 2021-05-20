const bot = require('../bot');
const updateFilter = require('../monster/functions/updateFilter');
const dictionary = require('../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.leader_skill.attribute", function (session, callback) {
    let buildKeyboard = (leaderSkills) => leaderSkills.map(leaderSkill => ({
        text: leaderSkill, callback_data: `monsters.filter.type.leader_skill.attribute.${leaderSkill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.leaderSkill.attribute}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Attack", "Defense", "Hp"]),
                buildKeyboard(["Speed", "Critical_rate"]),
                buildKeyboard(["Accuracy", "Resistance",])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
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
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];