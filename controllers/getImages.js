const mongodbConnection = require('../database/mongodbConnection');
const googleSearchApi = require('../google_search/googleSearchApi');
const date = require('date-and-time');

const getImages = async (req, res) => {
    const { q, page = 1 } = req.query;
    try {
        const { client, recentSearch } = await mongodbConnection();

        if (q === undefined || q === '') {
            res.status(400).json({
                message: "param 'q' is required."
            });
        }
        googleSearchApi(q, page)
            .then(async data => {
                await recentSearch.insertOne({
                    searchQuery: decodeURI(req.query.q),
                    timeSearched: date.format(new Date(), 'ddd, MMM DD YYYY HH:mm:ss')
                });
                await client.close();

                res.json({ images: data.items, queries: data.queries });
            })
            .catch(() => res.status(500).json({ message: "Service not found, try later." }));
    } catch (e) {
        res.status(500).json({
            message: "Database unable",
            error: e
        });
    }

}

module.exports = getImages