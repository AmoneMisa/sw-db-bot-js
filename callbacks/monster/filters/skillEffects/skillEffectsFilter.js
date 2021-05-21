const bot = require('../../../../bot');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.skills.effects", function (session, callback) {
    let buildKeyboard = (effects) => effects.map(effect => ({
        text: effect, callback_data: `monsters.filter.type.skills.effects.${effect.toLowerCase()}`
    }));

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skillEffect.filter}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["Aoe", "Damage"]),
                buildKeyboard(["Chance", "Effect",])
            ]
        }
    }).then(() => session.filter.skills[0].effects = session.filter.skills[0].effects || [{}]);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];