var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dinotask');


// Routine document. Completed/end_time can be used for history purposes.
var routineSchema = new mongoose.Schema({
  name: String,
  description: String,
  start_time: Date,
  end_time: Date,
  repeat: Object,
  tasks: Array,
  completed: Boolean,
  _creator: { type: Number, ref: 'User'}
});

// User document. Should hash password. Avatar just html link atm.
var userSchema = new mongoose.Schema({
  _idNum: Number,
  name: String,
  password: String,
  avatar: String
});
// userSchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.testvalue = counter.seq;
//         next();
//     });
// });

var Routine = mongoose.model('routine', routineSchema);
var User = mongoose.model('user', userSchema);

var testguy = new User({_id: 1, name: "Testy McTest", password: "pwd", avatar:"picture"});

module.exports.Routine = Routine;
module.exports.User = User;
