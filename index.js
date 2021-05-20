const defaultInterfaceCallbacks = require('./defaultInterface');
const newInterfaceCallbacks = require('./newInterface');
const languageCallback = require('./language');
const interfaceCallback = require('./interface');
const bot = require('./bot');
const dictionary = require('./dictionaries/mainDictionary');

let sessions = {};

bot.onText(/\/start/, (msg) => {
    sessions[`${msg.chat.id}`] = {language: "ru", interface: "default"};

    bot.sendMessage(msg.chat.id, `${dictionary[sessions[`${msg.chat.id}`].language].index}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Language",
                callback_data: "language"
            }], [{
                text: "Interface",
                callback_data: "interface"
            }], [{
                text: "Monsters",
                callback_data: "monsters"
            }]]
        }
    });
});

let callbacks = [];

function addCallbacks(callbackArray) {
    for (let item of callbackArray) {
        callbacks.push(item);
    }
}

addCallbacks(languageCallback);
addCallbacks(interfaceCallback);

bot.on("callback_query", (callback) => {
    let session = sessions[`${callback.message.chat.id}`];

    for (let [key, value] of callbacks) {
        if ((key instanceof RegExp && key.test(callback.data)) || callback.data === key) {
            if (key === "interface.new") {
                addCallbacks(newInterfaceCallbacks);
            } else if (key === "interface.default") {
                addCallbacks(defaultInterfaceCallbacks);
            }
            value(session, callback);
        }
    }

    bot.answerCallbackQuery(callback.id);
    console.log(session);
});

bot.on('polling_error', (error) => {
    console.error(error);
});