// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10


var UserSchema = new Schema({
  name:{
        type:String,
        index:1,
        unique:true,
        validate: {
          validator: function(v) {
            return /^[0-9_a-zA-Z]{6,20}$/.test(v);
          },
          message: '用户名必是由6至20个字母或数字组成'
        }
    },
  password: {
        type:String,
        required:true,
        validate: {
          validator: function(v) {
            return (v && v.length>=6 && v.length <=30);
          },
          message: '密码的长度必段在由6至30个字节之间'
        }
    },
  email: String,
  registerDate:Date,
  lastDate:Date
});

UserSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

UserSchema.pre('save',function(next){
  var user = this
  if (this.isNew) {
    this.registerDate = this.lastDate = Date.now()
  }
  else {
    this.lastDate = Date.now()
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}
UserSchema.statics={
  findById:function(id,cb){
    return this
      .findOne({_id: id})
      .exec(cb)
  },
  findByName: function(name, cb) {
    return this
      .findOne({'name':name})
      .exec(cb)
  },
  findByEmail: function(email, cb) {
    return this
      .findOne({'email':email})
      .exec(cb)
  }
}

mongoose.model('User', UserSchema);

