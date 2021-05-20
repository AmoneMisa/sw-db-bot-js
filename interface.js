const bot = require('./bot');
const dictionary = require('./dictionaries/mainDictionary');

module.exports = [["interface", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].interface.message}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Default",
                callback_data: "interface.default"
            }, {
                text: "New",
                callback_data: "interface.new"
            }]]
        }
    });
}], [/^interface\./, function (session, callback) {
    const [, _interface] = callback.data.match(/^interface\.(.*)$/);
    session.interface = _interface;
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].interface.message_2}: ${_interface}`);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];