const bot = require('../bot');
const getResult = require('./functions/getResult');
const dictionary = require('../dictionaries/mainDictionary');

module.exports = [["monsters.default.start", function (session, callback) {
    getResult(session, callback);
}], ["monsters.default.prev_page", function (session, callback) {
    session.page--;
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    getResult(session, callback);
}], ["monsters.default.next_page", function (session, callback) {
    session.page++;
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    getResult(session, callback);
}], ["monsters.default.result.sort", function (session, callback) {
    let buildKeyboard = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.default.result.sort.${callback}`
    }));

    let buildKeyboardMain = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.${callback}`
    }));

    let buttons = [[
        ["Attack", "maxAttack"],
        ["Defense", "maxDefense"],
        ["HP", "maxHp"],
        ["Spd", "speed"]
    ]].map(buildKeyboard);

   let mainButtons = [[
       ["Filter", "filter"],
       ["Help", "help"],
       ["Reset", "reset"]
   ]].map(buildKeyboardMain);

    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].result.message}`, {
        reply_markup: {
            inline_keyboard: [...buttons, ...mainButtons]
        }
    });
}], [/^monsters\.default\.result\.sort\./, function (session, callback) {
    const [, sortBy] = callback.data.match(/^monsters\.default\.result\.sort\.(.*)$/);
    if (session.sortBy === sortBy) {
        session.sortAsc = !session.sortAsc;
    } else {
        session.sortAsc = true;
    }
    session.sortBy = sortBy;
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    getResult(session, callback);
}]];