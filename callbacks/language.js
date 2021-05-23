const bot = require('../bot');
const dictionary = require('../dictionaries/mainDictionary');
const languageByChatId = require('../languageByChatId');
const sendMessage = require('../functions/sendMessage');
const deleteMessage = require('../functions/deleteMessage');

module.exports = [["language", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    return sendMessage(session, callback.message.chat.id, `${dictionary[session.language].language.message}`, {
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
    let prevLanguage = session.language;
    session.language = language;
    languageByChatId[callback.message.chat.id] = language;

    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);

    if (prevLanguage === language) {
        return;
    }

    bot.editMessageText(`${dictionary[session.language].index}`, {
        message_id: session.anchorMessageId,
        chat_id: callback.message.chat.id,
        reply_markup: {
            inline_keyboard: [[{
                text: "Language",
                callback_data: "language"
            }], [{
                text: "Search Monsters",
                callback_data: "monsters"
            }], [{
                text: "Ля ты крыса (Monkey)",
                callback_data: "rat"
            }]]
        }
    });
}]];