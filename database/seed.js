var database = require('./database_config.js');

var test_user = database.User.build({
  name: 'Sir Testburg',
  password:'test',
  avatar: 'http://www.yesnet.yk.ca/schools/projects/middleages2000/knights/graphics/horse.gif'
});

test_user.save().catch(function(error){
  console.log(error);
});

var test_routine = database.Routine.build({
  name: 'Joust',
  description: 'Daily jousting exercise',
  start_time: '12:00:00',
  end_time: '13:00:00',
  repeat: '{"Sunday": true, "Monday": false, "Tuesday": false, "Wednesday": true, "Thursday": true, "Friday": false, "Saturday": false}',
  completed: true,
  userId: 1
});

test_routine.save().catch(function(error){
  console.log(error);
});

var test_task = database.Task.build({
  name: 'Get on horse',
  description: 'Prepare for jousting by getting on horse',
  routineId: 1
});

test_task.save().catch(function(error){
  console.log(error);
});

var test_history = database.History.build({
  date: '2016-12-11',
  completed: true,
  userId: 1,
  routineId: 1
});

test_history.save().catch(function(error){
  console.log(error);
});

