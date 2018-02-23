const stockModel = require('../models/stock');
const request = require("request")

exports.createStock = function(req, res) {

  request('https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=MSFT,FB,AAPL&apikey='+process.env.ALPHA_API_KEY, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});

});
}


