const monstersCallbacks = require('./monsters/monsters');
const monsterPropertiesCallbacks = require('./monsterProperties/monsterProperties');
const monsterStatsCallbacks = require('./monsterStats/monsterStats');
const skillsCallbacks = require('./skills/skills');
const skillEffectsCallbacks = require('./skillEffects/skillEffects');
const effectsCallbacks = require('./effects/effects');
const leaderSkillCallbacks = require('./leaderSkill/leaderSkill');
const bot = require('./bot');

let sessions = {};

bot.onText(/\/start/, (msg) => {
    sessions[`${msg.chat.id}`] = {language: "ru"};

    bot.sendMessage(msg.chat.id, "Выберите то, что хотите отфильтровать", {
        reply_markup: {
            inline_keyboard: [[{
                text: "Monsters",
                callback_data: "monsters"
            }]]
        }
    });
});

let callbacks = [];

function addCallbacks(callbackArray) {
    for (let item of callbackArray) {
        callbacks.push(item);
    }
}

addCallbacks(monstersCallbacks);
addCallbacks(monsterPropertiesCallbacks);
addCallbacks(monsterStatsCallbacks);
addCallbacks(skillsCallbacks);
addCallbacks(skillEffectsCallbacks);
addCallbacks(effectsCallbacks);
addCallbacks(leaderSkillCallbacks);

bot.on("callback_query", (callback) => {
    let session = sessions[`${callback.message.chat.id}`];

    for (let [key, value] of callbacks) {
        if ((key instanceof RegExp && key.test(callback.data)) || callback.data === key) {
            value(session, callback);
        }
    }

    bot.answerCallbackQuery(callback.id);
    console.log(session);
});

bot.on('polling_error', (error) => {
    console.error(error);
});