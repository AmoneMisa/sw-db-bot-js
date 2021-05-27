const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.base_stars", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.stars.message}`, {
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
}], ["monsters.filter.type.base_stars.gte", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let buildKeyboard = (stars) => stars.map(star => ({
        text: star, callback_data: `monsters.filter.type.base_stars.gte.${star.toLowerCase()}`
    }));
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.stars.gte}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["1", "2", "3"]),
                buildKeyboard(["4", "5", "6"])
            ]
        }
    });
}], ["monsters.filter.type.base_stars.lte", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let buildKeyboard = (stars) => stars.map(star => ({
        text: star, callback_data: `monsters.filter.type.base_stars.lte.${star.toLowerCase()}`
    }));
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].monsters.stars.lte}`, {
        reply_markup: {
            inline_keyboard: [
                buildKeyboard(["1", "2", "3"]),
                buildKeyboard(["4", "5", "6"])
            ]
        }
    });
}], [/^monsters\.filter\.type\.base_stars\.gte\./, function (session, callback) {
    const [, baseStars] = callback.data.match(/^monsters\.filter\.type\.base_stars\.gte\.(.*)$/);

    if (baseStars === "1" || baseStars === "2" || baseStars === "3" ||
        baseStars === "4" || baseStars === "5" || baseStars === "6") {
        session.filter.baseStarsGte = parseInt(baseStars);
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}], [/^monsters\.filter\.type\.base_stars\.lte\./, function (session, callback) {
    const [, baseStars] = callback.data.match(/^monsters\.filter\.type\.base_stars\.lte\.(.*)$/);

    if (baseStars === "1" || baseStars === "2" || baseStars === "3" ||
        baseStars === "4" || baseStars === "5" || baseStars === "6") {
        session.filter.baseStarsLte = parseInt(baseStars);
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];