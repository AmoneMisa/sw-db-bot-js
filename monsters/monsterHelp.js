const bot = require('../bot');
const dictionary = require('../dictionaries/mainDictionary');

module.exports = [["monsters.help", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `/start - ${dictionary[session.language].help.message}\n\n` +
        `${dictionary[session.language].help.text}`);
}]];