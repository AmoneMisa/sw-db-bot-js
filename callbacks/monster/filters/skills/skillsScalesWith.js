const bot = require('../../../../bot');
const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/mainDictionary');

let filters = {
    "atk": "ATK",
    "def": "DEF",
    "spd": "SPD",
    "attackers_level": "Attacker's Level",
    "target_spd": "Target SPD",
    "relative_spd": "Relative SPD",
    "target_max_hp": "Target MAX HP",
    "max_hp": "MAX HP",
    "missing_hp": "Missing HP",
    "current_hp": "Current HP",
    "current_hp_percent": "Current HP %",
    "target_current_hp_percent": "Target Current HP %",
    "surviving_allies": "Surviving Allies",
    "living_ally": "Living Ally %",
    "alive_allies": "Alive Allies %",
    "alive_enemies": "Alive Enemies",
    "life_share": "Life Share",
    "life_share_aoe": "Life Share (AOE)",
};

module.exports = [["monsters.filter.type.skills.scales_with", function (session, callback) {
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.scales_with.${callback}`
    }));

    let buttons = [[
        ["Attack", "atk"],
        ["Defense", "def"],
        ["Attacker's Level", "attackers_level"]
    ], [
        ["Speed", "_spd"],
        ["HP", "_hp"]
    ], [
        ["Alive", "_alive"],
        ["Life share", "_life_share"]
    ]].map(buildKeyboard);

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}], ["monsters.filter.type.skills.scales_with._spd", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.scales_with.${callback}`
    }));

    let buttons = [[
        ["Target SPD", "target_spd"],
        ["Relative SPD", "relative_spd"],
        ["Speed", "spd"]
    ]].map(buildKeyboard);

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], ["monsters.filter.type.skills.scales_with._hp", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.scales_with.${callback}`
    }));

    let buttons = [[
        ["Target Max HP", "target_max_hp"],
        ["Max HP", "max_hp"],
        ["Missing HP", "missing_hp"],
    ], [
        ["Current HP", "current_hp"],
        ["Current HP %", "current_hp_percent"],
        ["Target Current HP %", "target_current_hp_percent"]
    ]].map(buildKeyboard);

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], ["monsters.filter.type.skills.scales_with._alive", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.scales_with.${callback}`
    }));

    let buttons = [[
        ["Surviving Allies", "surviving_allies"],
        ["Living Ally %", "living_ally"]
    ], [
        ["Alive Allies %", "alive_allies"],
        ["Alive Enemies", "alive_enemies"]
    ]].map(buildKeyboard);

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], ["monsters.filter.type.skills.scales_with._life_share", function (session, callback) {
    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.scales_with.${callback}`
    }));

    let buttons = [[
        ["Life Share", "life_share"],
        ["Life Share (AOE)", "life_share_aoe"]
    ]].map(buildKeyboard);

    bot.sendMessage(callback.message.chat.id, `${dictionary[session.language].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.filter\.type\.skills\.scales_with\./, function (session, callback) {
    let [, scalesWith] = callback.data.match(/^monsters\.filter\.type\.skills\.scales_with\.(.*)$/);
    session.filter.skills[0].scalesWith = session.filter.skills[0].scalesWith || [];

    if (!session.filter.skills[0].scalesWith.includes(filters[scalesWith]) && filters[scalesWith] !== undefined) {
        session.filter.skills[0].scalesWith.push(filters[scalesWith]);
        console.log(session.filter.skills[0]);
        updateFilter(session, callback);
    }
    bot.deleteMessage(callback.message.chat.id, callback.message.message_id);
}]];