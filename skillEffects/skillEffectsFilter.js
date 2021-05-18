const bot = require('../bot');

module.exports = [["monsters.filter.type.skills.effects", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(skill => ({
        text: skill, callback_data: `monsters.filter.type.skills.effects.${skill.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, "Выбрать свойства эффекта скилла", {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Effect", "Aoe", "Chance"])
            ]
        }
    }).then(() => session.filter.skills[0].effects = session.filter.skills[0].effects || [{}]);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];