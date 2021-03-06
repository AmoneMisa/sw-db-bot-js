const formatMonsterItem = require('../../functions/monsters/format/formatMonsterItem');
const buttonsDictionary = require('../../dictionaries/buttons');

module.exports = function (session) {
    let buttons = [];
    let pageSize = 25;
    session.scrolls.page = session.scrolls.page || 0;
    let monsters = session.scrolls.monsters.slice(session.scrolls.page * pageSize, (session.scrolls.page + 1) * pageSize);
    let countPages = Math.ceil(session.scrolls.monsters.length / 25);
    let info = `${session.language.text === "ru" ? 'Количество свитков' : 'Count scrolls'}: ${session.scrolls.stats.total}
5*:  ${session.scrolls.stats[5] || 0}
4*:  ${session.scrolls.stats[4] || 0}
3*:  ${session.scrolls.stats[3] || 0}\n\n`;

    if (session.scrolls.page > 0) {
        buttons.push({
            text: buttonsDictionary[session.language.buttons].prevPage,
            callback_data: "scrolls.prev_page"
        });
    }

    if ((session.scrolls.page + 1) < countPages) {
        buttons.push({
            text: buttonsDictionary[session.language.buttons].nextPage,
            callback_data: "scrolls.next_page"
        });
    }

    let monstersList = "";
    monstersList += info;

    for (let monster of monsters) {
        monstersList += `${formatMonsterItem(monster)}\n`;
    }

    let form = {
        reply_markup: {
            inline_keyboard: [buttons,
                [{
                    text: buttonsDictionary[session.language.buttons].close,
                    callback_data: "scrolls.close"
                }, {
                    text: buttonsDictionary[session.language.buttons].tryAgain,
                    callback_data: "scrolls.again"
                }, {
                    text: buttonsDictionary[session.language.buttons].select,
                    callback_data: "monsters.by_id"
                }], [{
                    text: buttonsDictionary[session.language.buttons].resetStats,
                    callback_data: "scrolls.reset_stats"
                }]]
        }
    };

    return {text: monstersList, form: form};
};