const stockModel = require('../models/stock');

exports.createStock = function(req, res) {
      stockModel.getStockByName(req.body.stock.toUpperCase(), function(err, data) {
      if (err) return res.status(501).send("Internal Error");
      if (data == "") {
        console.log("empty data")
            let stock = new stockModel({
                stock: req.body.stock.toUpperCase(),
                likes: 1,
                IP: [req.headers['x-forwarded-for'].split(',')[0]]
            });
            stockModel.createStock(stock, function(err, data) {
                if (err) return res.status(501).send("Internal Error");
                else {
                    return res.status(200).send(data.likes.toString());
                }

            });
        } 
      else{
        if(req.body.like){
                if(!data[0].IP.includes(req.headers['x-forwarded-for'].split(',')[0])) {
console.log("differetn ip data")
            stockModel.updateStock({
                IP: req.headers['x-forwarded-for'].split(',')[0]
            }, function(err, data) {
                if (err) return res.status(501).send("Internal Error");
                else {
                    return res.status(200).send(data.likes.toString());
                }

            });

        } 
        else {
        console.log("same ip data")
            return res.status(501).send("one like from same ip");
        }
        
        }
        else

        
      }


    });
}


    stockModel.getStockByName(req.body.stock.toUpperCase(), function(err, data) {
                    if (err) return res.status(501).send("Internal Error");
                else {
                    return res.status(200).send(data.likes.toString());
                }
    });
  
  



}