const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const lists = require('../../../../dictionaries/effectsList');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.skills.effects.effect.name", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let effectsList = `${dictionary[session.language].monsters.effect.name}`;
    let type = session.filter.skills[0].effects[0].effect.type;
    if (type) {
        effectsList += lists[type];
    } else {
        effectsList += lists["neutral"];
        effectsList += lists["debuff"];
        effectsList += lists["buff"];
    }

    sendMessage(session, callback.message.chat.id, effectsList, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            session.filter.skills[0].effects[0].effect.name = msg.text;
            updateFilter(session, callback);
            bot.removeReplyListener(id);
            deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
        });
    });
}]];