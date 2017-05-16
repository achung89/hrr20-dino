var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
// var ObjectId = require('mongodb').ObjectID
mongoose.connect('mongodb://heroku_1hgcxlwn:fbfssbc0g1idng25s217238au1@ds143141.mlab.com:43141/heroku_1hgcxlwn');


// Routine document. Completed/end_time can be used for history purposes.
var routineSchema = new mongoose.Schema({
  name: String,
  description: String,
  start_time: Date,
  end_time: Date,
  repeat: Object,
  tasks: Array,
  userId: String,
  completed: Boolean,
  _creator: { type: Number, ref: 'User'}
});

// User document. Should hash password. Avatar just html link atm.
var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  avatar: String
});






userSchema.pre('save' , function(next) {
  console.log('hashing')
  bcrypt.hash(this.password, null, null, (hash) => {
      console.log('hashed', hash);
      this.password = hash;
      next();
    });
});
var Routine = mongoose.model('routine', routineSchema);
var User = mongoose.model('user', userSchema);
User.prototype.comparePassword = function(attemptedPassword, callback) {
  console.log('comparator', attemptedPassword, this.password)
  bcrypt.compare(attemptedPassword, this.password, function(error, isMatch) {
    if (error) {
      callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};
// routineSchema.post('save', function() {

//     var doc = this;
//     console.log('testId',ObjectId(doc._id+''))
//     Routine.findOneAndUpdate({'_id':ObjectId(doc._id)}, {$inc: { seq: 10} },{new:true}, function(error, counter)   {
//         if(error)
//             return next(error);
//         console.log("and",doc.seq, counter);
//     });
// });

//var testguy = new User({_id: 1, name: "Testy McTest", password: "pwd", avatar:"picture"});

module.exports.Routine = Routine;
module.exports.User = User;
