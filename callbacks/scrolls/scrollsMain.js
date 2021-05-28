const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');
const dictionary = require('../../dictionaries/main');

module.exports = [["scrolls", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorScrollsMessageId = callback.message.message_id;
    session.scrolls = session.scrolls || {};
    session.scrolls.counter = session.scrolls.counter || 1;

    console.log(session.language);
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].scrolls.main}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Mystic Scroll",
                callback_data: "scrolls.type.mystic_scroll_default"
            }, {
                text: "Mystic Scroll Water",
                callback_data: "scrolls.type.mystic_scroll_water"
            }], [{
                text: "Mystic Scroll Fire",
                callback_data: "scrolls.type.mystic_scroll_fire"
            }, {
                text: "Mystic Scroll Wind",
                callback_data: "scrolls.type.mystic_scroll_wind"
            }], [{
                text: "Legendary Scroll",
                callback_data: "scrolls.type.legendary_scroll_default"
            }, {
                text: "Legendary Scroll Water",
                callback_data: "scrolls.type.legendary_scroll_water"
            }], [{
                text: "Legendary Scroll Fire",
                callback_data: "scrolls.type.legendary_scroll_fire"
            }, {
                text: "Legendary Scroll Wind",
                callback_data: "scrolls.type.legendary_scroll_wind"
            }], [{
                text: "Transcend Scroll",
                callback_data: "scrolls.type.transcend_scroll"
            }, {
                text: "Light & Dark Scroll",
                callback_data: "scrolls.type.ld_scroll"
            }], [{
                text: "Count of summons",
                callback_data: "scrolls.count"
            }]]
        }
    });
}]];