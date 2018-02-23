const stockModel = require('../models/stock');

exports.createStock = function(req, res) {
  
  
  stockModel.getStockByName(req.body.stock.toUpperCase(),function(err,data){
  if (err) return res.status(501).send("Internal Error");
  if(data==""){
   let stock=  new stockModel({
  stock: req.body.stock.toUpperCase(),
  likes: 1,
  IP:[req.headers['x-forwarded-for'].split(',')[0]]});
 stockModel.createStock(stock,function(err,data){
        if (err) return res.status(501).send("Internal Error");
        else {
            return res.status(200).send(data.likes.toString());
        }
  
 });

  }
  
    if(data.IP.includes(req.headers['x-forwarded-for'].split(',')[0])){
    
    stockModel.updateStock(1,function(err,data){});
      
    }
  
  });
  

}



