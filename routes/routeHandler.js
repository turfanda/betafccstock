const stockModel = require('../models/stock');
exports.createStock = function(req, res) {
  if(!req.body.like){
    stockModel.getStockByName(req.body.stock.toUpperCase(), function(err, data) {
      console.log(data);
      if (err) return res.status(501).send("Internal Error");
      if(data.length!==0)
        return res.status(200).send(data[0].likes.toString());
      else
        return res.status(200).send("0");
    });
  }
  else{
    stockModel.getStockByName(req.body.stock.toUpperCase(), function(err, data) {
      if (err) return res.status(501).send("Internal Error");
      if (data.length == 0){
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
        if(!data[0].IP.includes(req.headers['x-forwarded-for'].split(',')[0])) {
          stockModel.updateStock({
                IP: req.headers['x-forwarded-for'].split(',')[0]
            }, function(err, data) {
                if (err) return res.status(501).send("Internal Error");
                else {
                    return res.status(200).send(data[0].likes.toString());
                }
            });
        } 
        else {
            return res.status(501).send("one like from same ip");
        }
      }
    });
  }
}
exports.compareStock = function(req, res) {
  console.log(req.body);
 if(!req.body.like){
    stockModel.getTwoStock(req.body.stock[0].toUpperCase(),req.body.stock[1].toUpperCase(),function(err, data) {
      console.log(data);
      if (err) return res.status(501).send("Internal Error");
      if(data.length!==0)
        return res.json(data);
      else
        return res.status(200).send("0");
    });
  }
  else{
      stockModel.getTwoStock(req.body.stock[0].toUpperCase(),req.body.stock[1].toUpperCase(), function(err, data) {
      if (err) return res.status(501).send("Internal Error");
      if (data.length == 0){
        let stock1 = new stockModel({
                stock: req.body.stock[0].toUpperCase(),
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
    });
  }
}