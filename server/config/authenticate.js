const db = require('../../database/db_m.js');

exports.checkUser = function(req, res) {

  console.log('isSessions:', (req.session ? !!req.session.user : false));
  if (!(req.session ? !!req.session.user : false)) {
    console.log("Sent 400")
    res.sendStatus(400);
  } else {
    console.log("Sent 200")
    res.sendStatus(200);

  }
};


exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      console.log(req.session.user);
      console.log('regenerated');
      res.sendStatus(201);

    });
};

exports.loginUser = function(req, res) {
  var username = req.query.username;
  var password = req.query.password;
  console.log('in login User Username:',username,'Password:',password)
  db.User.findOne({ name: username }, function(err, user) {
        //asume err can be in place of !user
        if (!user) {
          res.sendStatus(404);
        } else {
          user.comparePassword(password, function(err,match){
            if (match) {
              exports.createSession(req, res, user);
            } else {
              res.status(404).send(err);
            }
          });
        }
      });
};
exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.sendStatus(200);
  });
};
exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  db.User.findOne({name: username}, function(err, user) {
      //Why cant I use err here?
      if (!user) {
        var newUser = new db.User({
          name: username,
          password: password,
          avatar: ''
        });
        newUser.save(function(err, newUser) {
          if(err) {
            console.log('there is an error');
            res.sendStatus(500,err);
          }else{
            console.log('Entry created');
            console.log('this is user:', !!newUser)

            exports.createSession(req, res, newUser);
          }
        });
      } else {
        console.log('Account already exists');
        res.sendStatus(404);
      }
    });
};