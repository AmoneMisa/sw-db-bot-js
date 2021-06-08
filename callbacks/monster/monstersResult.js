const bot = require('../../bot');
const getResult = require('../../functions/monsters/getResult');
const dictionary = require('../../dictionaries/main');
const buttonsDictionary = require('../../dictionaries/buttons');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');

module.exports = [["monsters.prev_page", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.page--;
    return getResult(session)
        .then(({text, form}) => {
            return bot.editMessageText(text, {
                ...form,
                chat_id: callback.message.chat.id,
                message_id: callback.message.message_id
            });
        });
}], ["monsters.next_page", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.page++;
    return getResult(session)
        .then(({text, form}) => {
            return bot.editMessageText(text, {
                ...form,
                chat_id: callback.message.chat.id,
                message_id: callback.message.message_id
            });
        });
}], ["monsters.result.sort", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.result.sort.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].attack, "maxAttack"],
        [buttonsDictionary[session.language.buttons].defense, "maxDefense"],
        [buttonsDictionary[session.language.buttons].hp, "maxHp"],
        [buttonsDictionary[session.language.buttons].spd, "speed"]
    ]].map(buildKeyboard);

    return sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].result.message}`, {
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
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
    return getResult(session)
        .then(({text, form}) => {
            return bot.editMessageText(text, {
                ...form,
                chat_id: callback.message.chat.id,
                message_id: session.anchorMessageId
            });
        });
}]];