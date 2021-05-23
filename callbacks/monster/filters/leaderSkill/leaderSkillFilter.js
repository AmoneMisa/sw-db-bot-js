const bot = require('../../../../bot');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.leader_skill", function (session, callback) {
    let buildKeyboard = (leaderSkills) => leaderSkills.map(leaderSkill => ({
        text: leaderSkill, callback_data: `monsters.filter.type.leader_skill.${leaderSkill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.leaderSkill.filter}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Attribute", "Amount"]),
                buildKeyboard(["Area", "Element"])
            ]
        }
    }).then((msg) => {
        session.filter.leaderSkill = session.filter.leaderSkill || {};
        session.messages[3] = msg.message_id;
    });
}]];