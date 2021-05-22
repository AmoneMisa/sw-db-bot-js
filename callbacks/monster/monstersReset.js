const bot = require('../../bot');
const updateFilter = require('../../functions/monsters/updateFilter');
const dictionary = require('../../dictionaries/mainDictionary');
const sendMessage = require('../../functions/sendMessage');
const deleteMessage = require('../../functions/deleteMessage');

module.exports = [["monsters.reset", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (buttons) => buttons.map(([text, callback]) => ({
        text: text, callback_data: `monsters.reset.${callback}`
    }));

    let buttons = [[
        ["All", "all"],
        ["Name", "name"],
        ["Element", "element"],
        ["Awaken", "awaken"]
    ], [
        ["Archetype", "type"],
        ["Base stars", "baseStars"],
        ["Leader skill", "leaderSkill"]
    ], [
        ["Stats", "stats"],
        ["Skills", "skills"],
        ["Is fusion food", "isFusionFood"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language].reset.message}`, {
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

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].reset.filter} ${reset} ${dictionary[session.language].reset.message_2}`)
        .then(msg => {
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
        });
    updateFilter(session, callback);
}]];