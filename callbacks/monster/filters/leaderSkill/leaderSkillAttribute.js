const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.leader_skill.attribute", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (leaderSkills) => leaderSkills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.leader_skill.attribute.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].attack, "attack"],
        [buttonsDictionary[session.language.buttons].defense, "defense"],
        [buttonsDictionary[session.language.buttons].hp, "hp"]
    ], [
        [buttonsDictionary[session.language.buttons].spd, "speed"],
        [buttonsDictionary[session.language.buttons].criRate, "critical_rate"]
    ], [
        [buttonsDictionary[session.language.buttons].accuracy, "accuracy"],
        [buttonsDictionary[session.language.buttons].resistance, "resistance"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.leaderSkill.attribute}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.filter\.type\.leader_skill\.attribute\./, function (session, callback) {
    const [, attribute] = callback.data.match(/^monsters\.filter\.type\.leader_skill\.attribute\.(.*)$/);

    if (attribute === "attack") {
        session.filter.leaderSkill.attribute = "Attack Power";
    } else if (attribute === "speed") {
        session.filter.leaderSkill.attribute = "Attack Speed";
    } else if (attribute === "critical_rate") {
        session.filter.leaderSkill.attribute = "Critical Rate";
    } else {
        session.filter.leaderSkill.attribute = attribute;
    }
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];