var mongoose = require('mongoose');
mongoose.connect('localhost:27017/freesubzi');
var Schema = mongoose.Schema;

var schema = new Schema({

    imagePath:{type:String, required:true},
    title:{type:String, required: true},
    description:{type:String, required:true},
    vitamins:{type:String, required:true},
    price:{type:Number, required:true},
    weight:{type:String, required:true}

});

module.exports = mongoose.model('Product',schema);