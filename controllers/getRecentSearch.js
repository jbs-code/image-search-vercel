const mongodbConnection = require("../database/mongodbConnection");

const getRecentSearch = async (req, res) => {
    try {
        const { client, recentSearch } = await mongodbConnection();
        const search = [];

        const data = await recentSearch.find().sort({$natural: -1}).limit(10);
        for await (const doc of data) {
            search.push(doc);
        }

        await client.close();
        res.json({ recent_search: search });
    } catch (error) {
        res.status(500).json({
            message: "Database unable",
            error
        });
    }

}

module.exports = getRecentSearch;