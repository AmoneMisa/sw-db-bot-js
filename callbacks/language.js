const bot = require('../bot');
const dictionary = require('../dictionaries/mainDictionary');
const languageByChatId = require('../languageByChatId');

let languageMsgId = null;

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
    languageByChatId[callback.message.chat.id] = language;

    if (languageMsgId !== null) {
        bot.editMessageText(`${dictionary[session.language].language.message_2}: ${language}`, {
            message_id: languageMsgId,
            chat_id: callback.message.chat.id
        });
    } else {
        bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].language.message_2}: ${language}`)
            .then(msg => languageMsgId = msg.message_id);
    }
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];