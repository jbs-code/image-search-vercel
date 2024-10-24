const googleSearchApi = async(query = '', page = 1) => {
    const start = (page <= 1) ? 0 : page-1;
    const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY_GOOGLE_SEARCH}&cx=${process.env.CX_GOOGLE_SEARCH}&searchType=image&start=${start}1&q=${encodeURI(query)}`);
    const data = await res.json();
    return data
}

module.exports = googleSearchApi;