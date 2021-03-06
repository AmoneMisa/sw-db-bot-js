const callbacks = require('./callbacks');
const bot = require('./bot');
const languageByChatId = require('./languageByChatId');
const dictionary = require('./dictionaries/main');
const buttonsDictionary = require('./dictionaries/buttons');
const sendMessage = require('./functions/sendMessage');
const fs = require('fs');

let sessions;

try {
    let sessionsJson = fs.readFileSync("./sessions.json");
    sessions = JSON.parse(sessionsJson);
} catch (e) {
    sessions = {};
}

bot.onText(/\/start/, (msg) => {
    languageByChatId[msg.chat.id] = languageByChatId[msg.chat.id] || "ru";

    sessions[msg.chat.id] = {
        messages: [],
        language: {
            text: languageByChatId[msg.chat.id],
            buttons: languageByChatId[msg.chat.id]
        },
        filter: {}
    };

    let session = sessions[msg.chat.id];

    sendMessage(session, msg.chat.id, `${dictionary[session.language.text].index}`, {
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
});

bot.on('message', (msg) => {
    let session = sessions[msg.chat.id];

    if (!session) {
        return;
    }

    session.messages.push(msg.message_id);
    // console.log(session);
});

bot.on("callback_query", (callback) => {
    let session = sessions[callback.message.chat.id];
    let results = [];

    for (let [key, value] of callbacks) {
        if ((key instanceof RegExp && key.test(callback.data)) || callback.data === key) {
            results.push(value(session, callback) || Promise.resolve());
        }
    }

    Promise.all(results).then(() => {
        bot.answerCallbackQuery(callback.id);
        // console.log(session);
    });
});

bot.on('polling_error', (error) => {
    console.error(error);
});

function shutdown() {
    fs.writeFileSync("./sessions.json", JSON.stringify(sessions));
    bot.stopPolling();
}

process.on('SIGTERM', shutdown);

process.on('SIGINT', shutdown);