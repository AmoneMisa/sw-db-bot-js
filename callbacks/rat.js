const deleteMessage = require('../functions/deleteMessage');
const bot = require('../bot');

module.exports = [["rat", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);

    let stickers = [
        "CAACAgIAAxkBAAIWs2Cqh-6VK5pR1ZkghaFcl-KrMqVoAAKZBwACGELuCKCi80XCwWuZHwQ",
        "CAACAgIAAxkBAAIWl2Cqg_3KHzusKubqscU7FRz0d4HFAAKyAAMQIQIQU0i6-SiGGyYfBA",
        "CAACAgIAAxkBAAIWtGCqiCJx92Cc4WgxJS5XZfwiYG8rAALYBwACGELuCBU4big7eueWHwQ",
        "CAACAgIAAxkBAAIWtWCqiDbWkYllDpPvosBy_UkfbXk2AAK7AAPO2OgLq5hxIyJkXq0fBA",
        "CAACAgIAAxkBAAIWtmCqiEL0qpcfkBGxMTx_gR9mBN1jAALBAAMQIQIQYS0Ksj-QAu8fBA",
        "CAACAgIAAxkBAAIWt2CqiFLkxcfmAyw5gmtSEFHg5XGGAALTAAPO2OgLL5Ep2erx6UQfBA"
    ];

    let index = Math.floor(Math.random() * stickers.length);

    return bot.sendSticker(callback.message.chat.id, stickers[index])
        .then(msg => {
            session.messages.push(msg.message_id);
        });
}]];