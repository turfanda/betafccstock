const stockModel = require('../models/stock');

exports.createStock = function(req, res) {
 let stock=  new stockModel({
  stock: req.body.stock,
  likes: 1,
  IP:[req.headers['x-forwarded-for'].split(',')[0]]});
 stockModel.createStock(stock,function(err,data){

            return res.send(data.likes);
  
 });

}



