const callbacks = require('./callbacks');
const bot = require('./bot');
const languageByChatId = require('./languageByChatId');
const dictionary = require('./dictionaries/mainDictionary');

let sessions = {};

bot.onText(/\/start/, (msg) => {
    languageByChatId[msg.chat.id] = languageByChatId[msg.chat.id] || "ru";

    sessions[msg.chat.id] = {
        messages: [],
        language: languageByChatId[msg.chat.id]
    };

    let session = sessions[msg.chat.id];

    bot.sendMessage(msg.chat.id, `${dictionary[session.language].index}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Language",
                callback_data: "language"
            }], [{
                text: "Monsters",
                callback_data: "monsters"
            }]]
        }
    }).then(msg => {
        session.messages[0] = msg.message_id;
    });
});

bot.on("callback_query", (callback) => {
    let session = sessions[callback.message.chat.id];

    for (let [key, value] of callbacks) {
        if ((key instanceof RegExp && key.test(callback.data)) || callback.data === key) {
            value(session, callback);
        }
    }

    bot.answerCallbackQuery(callback.id);
   console.log(session);
});

bot.on('polling_error', (error) => {
    console.error(error);
});