var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var PostSchema=new Schema({
  title:{
    type:String,
    require:true
  },
  content:{
    type:String,
    require:true
  },
  author:{
    type:Schema.Types.ObjectId,
    ref:'Users',
    require:true
  }
});

module.exports=mongoose.model('Posts',PostSchema);
