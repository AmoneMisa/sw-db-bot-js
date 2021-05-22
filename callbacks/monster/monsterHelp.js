const bot = require('../../bot');
const dictionary = require('../../dictionaries/mainDictionary');

module.exports = [["monsters.help", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `/start \\- ${dictionary[session.language].help.message}\n\n` +
        `${dictionary[session.language].help.text}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Close",
                callback_data: "monsters.help.close"
            }]]
        }
    });
}], ["monsters.help.close", function (session, callback) {
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];