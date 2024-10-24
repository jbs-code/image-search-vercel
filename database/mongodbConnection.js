const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGO_URI_CONNECTION;

async function mongodbConnection() {
    try {
        const client = new MongoClient(uri);
        const database = client.db('image_search');
        const recentSearch = database.collection('recent_search');
        return { client, recentSearch };
    } catch (e) {
        console.error("Database unable", e);
    }
}

module.exports = mongodbConnection;