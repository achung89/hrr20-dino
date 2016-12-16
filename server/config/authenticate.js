const db = require('../../database/db_m.js');

exports.checkUser = function(req, res) {
  if (!(req.session ? !!req.session.user : false)) {
    res.sendStatus(404);
  } else {
    res.sendStatus(202);
  }
};


exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/');
    });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  db.User.findOne({ name: username }, function(err, user) {
        //asume err can be in place of !user
        if (!user) {
          res.redirect('/');
        } else {
          if (user.password===password) {
            exports.createSession(req, res, user);
          } else {
            res.redirect('/');
          }
        }
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
            exports.createSession(req, res, newUser);
          }
        });
      } else {
        console.log('Account already exists');
        res.redirect('/');
      }
    });
};