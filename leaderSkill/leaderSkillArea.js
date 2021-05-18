const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');

module.exports = [["monsters.filter.type.leader_skill.area", function (session, callback) {
    let buildKeyboard = (leaderSkills) => leaderSkills.map(leaderSkill => ({
        text: leaderSkill, callback_data: `monsters.filter.type.leader_skill.area.${leaderSkill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, "Выберите значение", {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["General", "Guild"]),
                buildKeyboard(["Dungeon", "Element", "Arena"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.leader_skill\.area\./, function (session, callback) {
    const [, area] = callback.data.match(/^monsters\.filter\.type\.leader_skill\.area\.(.*)$/);
    session.filter.leaderSkill.area = area;
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];