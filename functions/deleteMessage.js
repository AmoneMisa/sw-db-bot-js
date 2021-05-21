const bot = require('../bot');

module.exports = function (chatId, messages, endIndex) {
    messages.splice(endIndex, messages.length - endIndex).forEach(messageId => {
        bot.deleteMessage(chatId, messageId);
    })
};