const bot = require('../bot');
const getResult = require('./functions/getResult');
const fetchAllMonsters = require('./functions/fetchAllMonsters');

const dictionary = require('../dictionaries/mainDictionary');

module.exports = [["monsters.result", function (session, callback) {
    // if (!session.filter) {
    //     fetchAllMonsters(session, callback);
    //     return;
    // }
    getResult(session, callback);
}], ["monsters.prev_page", function (session, callback) {
    session.page--;
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    getResult(session, callback);
}], ["monsters.next_page", function (session, callback) {
    session.page++;
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    getResult(session, callback);
}], ["monsters.result.sort", function (session, callback) {
    let buildKeyboard = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.result.sort.${callback}`
    }));

    let buttons = [[
        ["Attack", "maxAttack"],
        ["Defense", "maxDefense"],
        ["HP", "maxHp"],
        ["Spd", "speed"]
    ]].map(buildKeyboard);

    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].result.message}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.result\.sort\./, function (session, callback) {
    const [, sortBy] = callback.data.match(/^monsters\.result\.sort\.(.*)$/);
    if (session.sortBy === sortBy) {
        session.sortAsc = !session.sortAsc;
    } else {
        session.sortAsc = true;
    }
    session.sortBy = sortBy;
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
    getResult(session, callback);
}]];