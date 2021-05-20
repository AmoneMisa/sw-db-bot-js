const bot = require('../bot');
const dictionary = require('../dictionaries/mainDictionary');

module.exports = [["monsters", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].main}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Filter",
                callback_data: "monsters.filter"
            }, {
                text: "Help",
                callback_data: "monsters.help"
            }], [{
                text: "Reset",
                callback_data: "monsters.reset"
            }, {
                text: "Get result",
                callback_data: "monsters.result"
            }]]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];