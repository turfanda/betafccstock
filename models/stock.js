const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockScehma = new Schema({
  stock: { type: String, required: true, unique: true },
  likes: { type: Number, default: 0 },
  IP: {type: Array, default: []}
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
  Stock.findByIdAndUpdate(obj.id,{ "$push": { "IP": obj.IP }, "$inc": {likes: 1} },{new: true},callback)
}

module.exports.getTwoStock = function(name1,name2,callback){
  Stock.find({$or:[{stock: name1},{stock:name2}]},callback)
}

module.exports.updateTwoStock = function(obj,callback){
  Stock.findByIdAndUpdate(obj.id,{ "$push": { "IP": obj.IP }, "$inc": {likes: 1} },{new: true},callback)
}

module.exports.createTwoStock = function(newStock,callback){
  newStock[0].save();
   newStock[1].save(callback);
}