const bot = require('./bot');
const dictionary = require('./dictionaries/mainDictionary');

module.exports = [["language", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].language.message}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Ru",
                callback_data: "language.ru"
            }, {
                text: "En",
                callback_data: "language.en"
            }]]
        }
    });
}], [/^language\./, function (session, callback) {
    const [, language] = callback.data.match(/^language\.(.*)$/);
    session.language = language;
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].language.message_2}: ${language}`);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];