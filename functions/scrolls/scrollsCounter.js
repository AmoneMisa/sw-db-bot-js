module.exports = function (session) {
    return function (r) {
        session.scrolls.stats = session.scrolls.stats || {};
        session.scrolls.stats.total = session.scrolls.stats.total || 0;
        session.scrolls.stats.total += r.data.length;

        let counts = session.scrolls.stats;

        for (let item of r.data) {
            if (!counts[item.baseStars]) {
                counts[item.baseStars] = 0;
            }
            counts[item.baseStars]++;
        }

        return r;
    }
};