const bot = require('../../../bot');
const dictionary = require('../../../dictionaries/mainDictionary');

module.exports = [/^scrolls\.mystic_scrolls\./, function (session, callback) {
    const [, scroll] = callback.data.match(/^scrolls\.mystic_scroll\.(.*)$/);

    bot.sendMessage(callback.message.chat.id, `Вы выбрали призывать: ${scroll}. Сколько раз призываем? Максимум: 100, минимум: 1.`, {
        reply_markup: {
            force_reply: true
        }
    }).then((msg) => {
        let id = bot.onReplyToMessage(msg.chat.id, msg.message_id, (msg) => {
            bot.removeReplyListener(id);
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.deleteMessage(msg.chat.id, msg.reply_to_message.message_id);
            bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    }).then(() => {
        bot.sendMessage(callback.message.chat.id, `призываю, призываю`, {
            reply_markup: {
                force_reply: true
            }
        })
    });
}];