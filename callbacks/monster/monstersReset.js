const bot = require('../../bot');
const updateFilter = require('../../functions/monsters/updateFilter');
const dictionary = require('../../dictionaries/main');
const buttonsDictionary = require('../../dictionaries/buttons');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');

module.exports = [["monsters.reset", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.reset.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].all, "all"],
        [buttonsDictionary[session.language.buttons].name, "name"],
        [buttonsDictionary[session.language.buttons].element, "element"],
        [buttonsDictionary[session.language.buttons].awaken, "awaken"]
    ], [
        [buttonsDictionary[session.language.buttons].type, "type"],
        [buttonsDictionary[session.language.buttons].baseStars, "baseStars"],
        [buttonsDictionary[session.language.buttons].leaderSkill, "leaderSkill"]
    ], [
        [buttonsDictionary[session.language.buttons].stats, "stats"],
        [buttonsDictionary[session.language.buttons].skills, "skills"],
        [buttonsDictionary[session.language.buttons].isFusionFood, "isFusionFood"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].reset.message}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.reset\./, function (session, callback) {
    const [, reset] = callback.data.match(/^monsters\.reset\.(.*)$/);

    if (reset === "all") {
        session.filter = {};
    } else if (reset === "baseStars") {
        delete session.filter.baseStarsLte;
        delete session.filter.baseStarsGte;
    } else if (reset === "stats") {
        delete session.filter.accuracy;
        delete session.filter.resistance;
        delete session.filter.criticalRate;
        delete session.filter.speedGte;
        delete session.filter.speedLte;
        delete session.filter.maxAttackGte;
        delete session.filter.maxAttackLte;
        delete session.filter.maxHpGte;
        delete session.filter.maxHpLte;
        delete session.filter.maxDefenseGte;
        delete session.filter.maxDefenseLte;
    } else {
        delete session.filter[reset];
    }

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].reset.filter} ${reset} ${dictionary[session.language.text].reset.message_2}`)
        .then(msg => {
                bot.deleteMessage(msg.chat.id, msg.message_id);
                bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    updateFilter(session, callback);
}]];