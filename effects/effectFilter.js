const bot = require('../bot');
const dictionary = require('../dictionaries/mainDictionary');

module.exports = [
    ["monsters.filter.type.skills.effects.effect", function (session, callback) {
        let buildKeyboard = (effects) => effects.map(effect => ({
            text: effect, callback_data: `monsters.filter.type.skills.effects.effect.${effect.toLowerCase()}`
        }));

        bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.effect.filter}`, {
            reply_markup: {
                inline_keyboard: [
                    buildKeyboard(["Name"]),
                    buildKeyboard(["Type"])
                ]
            }
        }).then(() => session.filter.skills[0].effects[0].effect = session.filter.skills[0].effects[0].effect || {});
        bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    }]
];