const stockModel = require('../models/stock');

exports.createStock = function(req, res) {
 console.log(req.body);
  
 let stock=  new stockModel({
  stock: req.body.stock,
  likes: 1,
  IP:[req.headers['x-forwarded-for'].split(',')[0]]});
 stockModel.createStock(stock,function(err,data){
 if(err)
    if (err) return res.status(501).send("Internal Error");
   else{
   return res.send(data.likes);
   }
  
 });

}



