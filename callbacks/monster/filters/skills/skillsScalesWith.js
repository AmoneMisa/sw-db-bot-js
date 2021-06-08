const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

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
    "curr_hp_perc": "Current HP %",
    "target_curr_hp_perc": "Target Current HP %",
    "surviving_allies": "Surviving Allies",
    "living_ally": "Living Ally %",
    "alive_allies": "Alive Allies %",
    "alive_enemies": "Alive Enemies",
    "life_share": "Life Share",
    "life_share_aoe": "Life Share (AOE)",
};

module.exports = [["monsters.filter.type.skills.scales_with", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;

    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.scales_with.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].attack, "atk"],
        [buttonsDictionary[session.language.buttons].defense, "def"],
        [buttonsDictionary[session.language.buttons].attackersLevel, "attackers_level"]
    ], [
        [buttonsDictionary[session.language.buttons].spd, "_spd"],
        [buttonsDictionary[session.language.buttons].hp, "_hp"]
    ], [
        [buttonsDictionary[session.language.buttons].alive, "_alive"],
        [buttonsDictionary[session.language.buttons].lifeShare, "_life_share"]
    ]].map(buildKeyboard);
    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], ["monsters.filter.type.skills.scales_with._spd", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.scales_with.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].targetSpd, "target_spd"],
        [buttonsDictionary[session.language.buttons].relativeSpd, "relative_spd"],
        [buttonsDictionary[session.language.buttons].spd, "spd"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], ["monsters.filter.type.skills.scales_with._hp", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.scales_with.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].targetMaxHp, "target_max_hp"],
        [buttonsDictionary[session.language.buttons].maxHp, "max_hp"],
        [buttonsDictionary[session.language.buttons].missingHp, "missing_hp"],
    ], [
        [buttonsDictionary[session.language.buttons].currentHp, "curr_hp"],
        [buttonsDictionary[session.language.buttons].currentHpPercent, "curr_hp_perc"],
        [buttonsDictionary[session.language.buttons].targetCurrentHpPercent, "target_curr_hp_perc"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], ["monsters.filter.type.skills.scales_with._alive", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.scales_with.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].survivingAllies, "surviving_allies"],
        [buttonsDictionary[session.language.buttons].livingAllyPercent, "living_ally"]
    ], [
        [buttonsDictionary[session.language.buttons].aliveAlliesPercent, "alive_allies"],
        [buttonsDictionary[session.language.buttons].aliveEnemies, "alive_enemies"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], ["monsters.filter.type.skills.scales_with._life_share", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    let buildKeyboard = (skills) => skills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.skills.scales_with.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].lifeShare, "life_share"],
        [buttonsDictionary[session.language.buttons].lifeShareAoe, "life_share_aoe"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.skills.scalesWith}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.filter\.type\.skills\.scales_with\./, function (session, callback) {
    let [, scalesWith] = callback.data.match(/^monsters\.filter\.type\.skills\.scales_with\.(.*)$/);
    session.filter.skills[0].scalesWith = session.filter.skills[0].scalesWith || [];

    if (!session.filter.skills[0].scalesWith.includes(filters[scalesWith]) && filters[scalesWith] !== undefined) {
        session.filter.skills[0].scalesWith.push(filters[scalesWith]);
        updateFilter(session, callback);
    }
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];