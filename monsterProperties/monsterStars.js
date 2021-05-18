const bot = require('../bot');
const updateFilter = require('../monsters/functions/updateFilter');
const dictionary = require('../dictionaries/mainDictionary');

module.exports = [["monsters.filter.type.base_stars", function (session, callback) {
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stars.message}`, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Greater than",
                callback_data: "monsters.filter.type.base_stars.gte"
            }, {
                text: "Less than",
                callback_data: "monsters.filter.type.base_stars.lte"
            }]]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], ["monsters.filter.type.base_stars.gte", function (session, callback) {
    let buildKeyboard = (stars) => stars.map(star => ({
        text: star, callback_data: `monsters.filter.type.base_stars.gte.${star.toLowerCase()}`
    }));
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stars.gte}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["1", "2", "3"]),
                buildKeyboard(["4", "5", "6"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], ["monsters.filter.type.base_stars.lte", function (session, callback) {
    let buildKeyboard = (stars) => stars.map(star => ({
        text: star, callback_data: `monsters.filter.type.base_stars.lte.${star.toLowerCase()}`
    }));
    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.stars.lte}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["1", "2", "3"]),
                buildKeyboard(["4", "5", "6"])
            ]
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.base_stars\.gte\./, function (session, callback) {
    const [, baseStars] = callback.data.match(/^monsters\.filter\.type\.base_stars\.gte\.(.*)$/);

    if (baseStars === "1" || baseStars === "2" || baseStars === "3" ||
        baseStars === "4" || baseStars === "5" || baseStars === "6") {
        session.filter.baseStarsGte = parseInt(baseStars);
    }
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], [/^monsters\.filter\.type\.base_stars\.lte\./, function (session, callback) {
    const [, baseStars] = callback.data.match(/^monsters\.filter\.type\.base_stars\.lte\.(.*)$/);

    if (baseStars === "1" || baseStars === "2" || baseStars === "3" ||
        baseStars === "4" || baseStars === "5" || baseStars === "6") {
        session.filter.baseStarsLte = parseInt(baseStars);
    }
    updateFilter(session, callback);
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]
];