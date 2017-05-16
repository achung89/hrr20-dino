const Promise = require('bluebird');
// const Models = require('../../../database/database_config');


module.exports = {

  addATask: function (req, res, next) {
    Models.Task.build({
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
      routineId: req.params.routineId
    })
    .save()
    .then(function(addedTask) {
      res.json(addedTask);
    })
    .catch(function(error) {
      next(error);
    });
  },

  //gets the routines for the specific user
  getAllTasks: function(req, res, next) {
    Models.Task.findAll({
      where: {
        routineId: req.params.routineId
      }
    })
      .then(function (tasks) {
        res.json(tasks);
      })
      .catch(function(error) {
        next(error);
      });

  },

  deleteATask: function(req, res, next) {
    Models.Task.destroy({
      where: {
        id: req.params.taskId
      }
    })
    .then(function(result) {
      res.send('Task successfully removed!');
    })
    .catch(function(error) {
      next(error);
    })
  },

  updateATask: function(req, res, next) {
    Models.Task.update(req.body, {
      where: {
        id:  req.params.taskId
      },
      returning: true
    })
    .then(function(count, result) {
      res.json(result);
    })
    .catch(function(error) {
      next(error);
    })
  }


}
