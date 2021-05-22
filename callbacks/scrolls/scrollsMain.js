const bot = require('../../bot');
const dictionary = require('../../dictionaries/mainDictionary');

module.exports = [["scrolls", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].main}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Mystic Scroll",
                callback_data: "scrolls.mystic_scroll.default"
            }, {
                text: "Mystic Scroll Water",
                callback_data: "scrolls.mystic_scroll.water"
            }], [{
                text: "Mystic Scroll Fire",
                callback_data: "scrolls.mystic_scroll.fire"
            }, {
                text: "Mystic Scroll Wind",
                callback_data: "scrolls.mystic_scroll.wind"
            }], [{
                text: "Legendary Scroll",
                callback_data: "scrolls.legendary_scroll.default"
            }, {
                text: "Legendary Scroll Water",
                callback_data: "scrolls.legendary_scroll.water"
            }], [{
                text: "Legendary Scroll Fire",
                callback_data: "scrolls.legendary_scroll.fire"
            }, {
                text: "Legendary Scroll Wind",
                callback_data: "scrolls.legendary_scroll.wind"
            }], [{
                text: "Transcend Scroll",
                callback_data: "scrolls.transcend_scroll"
            }, {
                text: "Light & Dark Scroll",
                callback_data: "scrolls.ld_scroll"
            }]]
        }
    });
}]];