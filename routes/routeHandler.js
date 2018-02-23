const stockModel = require('../models/stock');
const https = require("https")

exports.createStock = function(req, res) {

  
  https.get('https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=MSFT,FB,AAPL&apikey='+process.env.ALPHA_API_KEY, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    console.log(data);
    data += chunk;
  });

  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}


