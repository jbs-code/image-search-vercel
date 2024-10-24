const express = require('express');
const path = require('path');
var cors = require('cors');
const getImages = require('./controllers/getImages');
const getRecentSearch = require('./controllers/getRecentSearch');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('./index.html')
});
app.get('/search', getImages);
app.get('/recent-search', getRecentSearch);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
