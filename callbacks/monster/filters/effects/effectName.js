const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');
const lists = require('../../../../dictionaries/effectsList');

module.exports = [["monsters.filter.type.skills.effects.effect.name", function (session, callback) {
    let effectsList = `${dictionary[session.language].monsters.effect.name}`;
    let type = session.filter.skills[0].effects[0].effect.type;
    if (type) {
            effectsList += lists[type];
    } else {
        effectsList += lists["neutral"];
        effectsList += lists["debuff"];
        effectsList += lists["buff"];
    }

    bot.sendMessage(callback.message.chat.id, effectsList, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.skills[0].effects[0].effect.name = msg.text;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
            bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    });
}]];