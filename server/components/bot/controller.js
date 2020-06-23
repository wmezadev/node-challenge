const axios = require("axios");
const parse = require('csv-parse');

async function getStock (stock_code) {
    const response = await axios.get(`https://stooq.com/q/l/?s=${stock_code}&f=sd2t2ohlcv&h&e=csv`);
    
    return response.data;
}

module.exports = {
    getStock
};