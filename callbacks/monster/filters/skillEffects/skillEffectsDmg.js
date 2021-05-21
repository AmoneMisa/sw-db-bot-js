const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.skills.effects.damage", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skillEffect.dmg}`, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Yes",
                    callback_data: "monsters.filter.type.skills.effects.damage.yes"
                }],
                [{
                    text: "Nope",
                    callback_data: "monsters.filter.type.skills.effects.damage.no"
                }]
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.skills\.effects\.damage\./, function (session, callback) {
    const [, damage] = callback.data.match(/^monsters\.filter\.type\.skills\.effects\.damage\.(.*)$/);
    session.filter.skills[0].effects[0].damage = damage === "yes";
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];