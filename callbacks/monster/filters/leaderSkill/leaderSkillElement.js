const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.leader_skill.element", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (leaderSkills) => leaderSkills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.leader_skill.element.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].fire, "fire"],
        [buttonsDictionary[session.language.buttons].water, "water"],
        [buttonsDictionary[session.language.buttons].wind, "wind"]
    ], [
        [buttonsDictionary[session.language.buttons].light, "light"],
        [buttonsDictionary[session.language.buttons].dark, "dark"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.leaderSkill.element}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.filter\.type\.leader_skill\.element\./, function (session, callback) {
    const [, element] = callback.data.match(/^monsters\.filter\.type\.leader_skill\.element\.(.*)$/);
    session.filter.leaderSkill.element = element;
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];