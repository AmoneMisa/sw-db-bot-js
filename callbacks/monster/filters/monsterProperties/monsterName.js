const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');

module.exports = [
    ["monsters.filter.type.name", function (session, callback) {
        bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.name}`, {
            reply_markup: {
                force_reply: true
            }
        }).then((msg) => {
            let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
                session.filter.name = msg.text;
                session.messages[3] = callback.message.message_id;
                updateFilter(session, callback);
                bot.removeReplyListener(id);
                bot.deleteMessage(msg.chat.id, msg.message_id);
                bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
                bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
            });
        });
    }]
];