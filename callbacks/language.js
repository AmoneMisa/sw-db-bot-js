const bot = require('../bot');
const dictionary = require('../dictionaries/main');
const buttonsDictionary = require('../dictionaries/buttons');
const languageByChatId = require('../languageByChatId');
const sendMessage = require('../functions/sendMessage');
const deleteMessage = require('../functions/deleteMessage');

module.exports = [["language", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    return sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].language.message}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Текст Ru",
                callback_data: "language.text.ru"
            }, {
                text: "Text En",
                callback_data: "language.text.en"
            }],[{
                text: "Кнопки Ru",
                callback_data: "language.buttons.ru"
            }, {
                text: "Buttons En",
                callback_data: "language.buttons.en"
            }]]
        }
    });
}], [/^language\.text\./, function (session, callback) {
    const [, language] = callback.data.match(/^language\.text\.(.*)$/);
    let prevLanguage = session.language.text;
    session.language.text = language;
    languageByChatId[callback.message.chat.id].text = language;

    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);

    if (prevLanguage === language) {
        return;
    }

    bot.editMessageText(`${dictionary[session.language.text].index}`, {
        message_id: session.anchorMessageId,
        chat_id: callback.message.chat.id,
        reply_markup: {
            inline_keyboard: [[{
                text: buttonsDictionary[session.language.buttons].language,
                callback_data: "language"
            }], [{
                text: buttonsDictionary[session.language.buttons].search,
                callback_data: "monsters"
            }, {
                text: buttonsDictionary[session.language.buttons].summon,
                callback_data: "scrolls"
            }], [{
                text: "Ля ты крыса (Monkey)",
                callback_data: "rat"
            }]]
        }
    });
}], [/^language\.buttons\./, function (session, callback) {
    const [, language] = callback.data.match(/^language\.buttons\.(.*)$/);
    let prevLanguage = session.language.buttons;
    session.language.buttons = language;
    languageByChatId[callback.message.chat.id].buttons = language;

    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);

    if (prevLanguage === language) {
        return;
    }

    bot.editMessageText(`${dictionary[session.language.text].index}`, {
        message_id: session.anchorMessageId,
        chat_id: callback.message.chat.id,
        reply_markup: {
            inline_keyboard: [[{
                text: buttonsDictionary[session.language.buttons].language,
                callback_data: "language"
            }], [{
                text: buttonsDictionary[session.language.buttons].search,
                callback_data: "monsters"
            }, {
                text: buttonsDictionary[session.language.buttons].summon,
                callback_data: "scrolls"
            }], [{
                text: "Ля ты крыса (Monkey)",
                callback_data: "rat"
            }]]
        }
    });
}]];