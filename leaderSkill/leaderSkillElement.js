const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');


module.exports = [["monsters.filter.type.leader_skill.element", function (session, callback) {
    let buildKeyboard = (leaderSkills) => leaderSkills.map(leaderSkill => ({
        text: leaderSkill, callback_data: `monsters.filter.type.leader_skill.element.${leaderSkill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, "Выберите значение", {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Fire", "Water", "Wind"]),
                buildKeyboard(["Light", "Dark"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.leader_skill\.element\./, function (session, callback) {
    const [, element] = callback.data.match(/^monsters\.filter\.type\.leader_skill\.element\.(.*)$/);
    session.filter.leaderSkill.element = element;
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];