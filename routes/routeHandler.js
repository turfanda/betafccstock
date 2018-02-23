const stockModel = require('../models/stock');
const request = require("request")

exports.createStock = function(req, res) {
 console.log(req.body);
  if(req.body.like){
 let stock={
  stock: req.body.stock,
  likes: 1,
  IPs:[req.headers['x-forwarded-for'].split(',')[0]]}
 console.log(stock);
 stockModel.createStock(stock,function(err,data){
 if(err)
    if (err) return res.status(501).send("Internal Error");
   else
     return res.status(200).send(data.likes);
 });
 }

}



