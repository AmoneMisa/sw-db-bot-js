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
    }).then(() => session.filter.leaderSkill = session.filter.leaderSkill || {});
}]];