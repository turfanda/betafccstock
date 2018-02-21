const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockScehma = new Schema({
  stock: { type: String, required: true, unique: true },
  likes: { type: Number, default: 0 },
  IPs: {type: Array, default: []}
});

let Stock = mongoose.model('Stock', stockScehma);

module.exports = Stock;

module.exports.createStock = function(newStock,callback){
  newStock.save(callback);
}

module.exports.getStockByName = function(name,callback){
  let query ={"stock":name};
   Stock.find(query,callback);
}

module.exports.updateStock = function(obj,callback){
  Stock.findByIdAndUpdate(obj.id,{ "$push": { "IPs": obj.address }, "$inc": {likes: 1} },{new: true},callback)
}