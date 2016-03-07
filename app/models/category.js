var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
  name:{
      type:String,
    },
  parent:{
    type: ObjectId,
    ref: 'Category'
  }
});

mongoose.model('Category', CategorySchema);