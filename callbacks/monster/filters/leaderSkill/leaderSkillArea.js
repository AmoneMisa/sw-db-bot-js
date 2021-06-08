const updateFilter = require('../../../../functions/monsters/updateFilter');
const dictionary = require('../../../../dictionaries/main');
const buttonsDictionary = require('../../../../dictionaries/buttons');
const sendMessage = require('../../../../functions/sendMessage');
const deleteMessage = require('../../../../functions/deleteMessage');

module.exports = [["monsters.filter.type.leader_skill.area", function (session, callback) {
    deleteMessage(callback.message.chat.id, session.messages, callback.message.message_id);
    session.anchorMessageId = callback.message.message_id;
    let buildKeyboard = (leaderSkills) => leaderSkills.map(([text, callback]) => ({
        text: text, callback_data: `monsters.filter.type.leader_skill.area.${callback}`
    }));

    let buttons = [[
        [buttonsDictionary[session.language.buttons].general, "general"],
        [buttonsDictionary[session.language.buttons].guild, "guild"],
    ], [
        [buttonsDictionary[session.language.buttons].dungeon, "dungeon"],
        [buttonsDictionary[session.language.buttons].element, "element"],
        [buttonsDictionary[session.language.buttons].arena, "arena"]
    ]].map(buildKeyboard);

    sendMessage(session, callback.message.chat.id, `${dictionary[session.language.text].monsters.leaderSkill.area}`, {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}], [/^monsters\.filter\.type\.leader_skill\.area\./, function (session, callback) {
    const [, area] = callback.data.match(/^monsters\.filter\.type\.leader_skill\.area\.(.*)$/);
    session.filter.leaderSkill.area = area;
    updateFilter(session, callback);
    deleteMessage(callback.message.chat.id, session.messages, session.anchorMessageId);
}]];