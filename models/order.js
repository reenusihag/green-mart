var mongoose = require('mongoose');
mongoose.connect('localhost:27017/freesubzi');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref:'User'},
    cart:{type:Object, required: true},
    name:{type:String, required: true},
    number:{type:String},
    alternate_number:{type:String},
    address:{type:String, required: true},
    paymentMode:{type:String, required:true},
    paymentId:{type:String}
});


module.exports=mongoose.model('Order',userSchema);