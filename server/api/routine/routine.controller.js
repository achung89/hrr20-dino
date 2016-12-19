const Promise = require('bluebird');
// const Models = require('../../../database/database_config');
const db = require('../../../database/db_m.js');

module.exports = {
  //Adds a user's routine to the Routine table
  addARoutine: function (req, res, next) {
    let routine = {
        name: req.body.name,
        description: req.body.description,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        repeat: req.body.repeat,
        userId: req.session.user._id,
        completed: req.body.completed,
        // _creator: req.body.userId,
        tasks: req.body.tasks
    }
    db.Routine.create(routine, (err, resp) => {
      if (err) console.log(err);
      res.status(201).send(resp);
    });
  },

  //Gets the routines for the current user
  getMyRoutines: function(req, res, next) {
    var query;
    if(req.session.user){
      query = {userId:req.session.user._id};
    }else{
      query = {};
    }
    db.Routine.find(query, (err, data)=>{
      if (err) console.log(err);
      res.send(data);
    });
  },

  addEmailedRoutine: function(req, res) {
    var email = /\<(.*)\>/.exec(req.body.headers.From)[1];
    var name = req.body.headers.Subject;
    // get array with tasks/repeat split out.
    var bodyArray = /Days\:(.*)\n\nTasks\:\n([\S\s]*)/.exec(req.body.plain);

    // trim out blank tasks
    var tasks = bodyArray[2]
      .split('\n')
      .reduce((m, i)=>{
        if (i!=='') {
          m.push(i);
        }
        return m;
      }, []);

    // parse days to boolean for repeats.
    var repeat = {
      Sunday: /.*sun.*/i.test(bodyArray[1]),
      Monday: /.*mon.*/i.test(bodyArray[1]),
      Tuesday: /.*tue.*/i.test(bodyArray[1]),
      Wednesday: /.*wed.*/i.test(bodyArray[1]),
      Thursday: /.*thu.*/i.test(bodyArray[1]),
      Friday: /.*fri.*/i.test(bodyArray[1]),
      Saturday: /.*sat.*/i.test(bodyArray[1])
    };

    db.User.findOne({name: email}, (err, data)=>{
      var user = data;
      //console.log('User found:', user);
      var newRoutine = {
        userId: user._id,
        name: name,
        description: 'Created from email',
        repeat: repeat,
        completed: false,
        tasks: tasks
      }

      db.Routine.create(newRoutine, (err, resp) => {
        if (err) console.log(err);
        res.status(200).send(resp);
      });
    });

    // res.sendStatus(200);
  },

  //Gets a single routine for a user
  getARoutine: function(req, res, next) {
    Models.Routine.findAll({
      where: {
        id: req.params.routineId,
        userId: req.params.userId
      }
    })
    .then(function(routine){
      console.log(routine);
      res.status(200).json(routine);
    })
    .catch(function(error) {
      res.send(error);
    });
  },

  //Deletes a user's routine from the Routine table
  deleteARoutine: function(req, res, next) {
    Models.Routine.destroy({
      where: {
        id: req.params.routineId,
        userId: req.params.userId
      }
    })
    .then(function() {
      res.status(200).send('Routine successfully deleted!')
    })
    .catch(function(error){
      res.send(error);
    });
  },

  updateARoutine: function(req, res, next) {
    //Syntax for this might be tricky, as we have to dynamically
    //update a user-specified routine property.
    db.Routine.findByIdAndUpdate(req.body._id, req.body).exec((err, data)=>{
      res.status(204).send(data);
    });
  },
}
