var Sequelize = require('sequelize');

//#######################__Create Connection__##############################

var db_connection = new Sequelize(process.env.POSTGRESQL_LOCAL_DB, '', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

//########################__Define Models__###############################

var User = db_connection.define('user', {
  id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  name: {type: Sequelize.STRING, unique: true, validate: {notEmpty: true}},
  password: {type: Sequelize.STRING, validate: {notEmpty: true}},
  avatar: {type: Sequelize.STRING}
});

var Routine = db_connection.define('routine', {
  id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  name: {type: Sequelize.STRING, unique: true, validate: {notEmpty: true}},
  description: {type: Sequelize.TEXT, validate: {notEmpty: true}},
  start_time: {type: Sequelize.TIME},
  end_time: {type: Sequelize.TIME},
  repeat: {type: Sequelize.JSON}, //this JSON object gets created/updated on the client side
  completed: {type: Sequelize.BOOLEAN}
});

var Task = db_connection.define('task', {
  id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  name: {type: Sequelize.STRING, unique: true, validate: {notEmpty: true}},
  description: {type: Sequelize.STRING, validate: {notEmpty: true}},
  completed: {type: Sequelize.BOOLEAN}
});

var History = db_connection.define('history', {
  id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  date: {type: Sequelize.DATEONLY},
  completed: {type: Sequelize.BOOLEAN}
});

//#######################__Define Associations__##############################

User.hasMany(Routine);
Task.belongsTo(Routine);
History.belongsTo(User);
History.belongsTo(Routine);

//#######################__Sync Database and Export__##############################

db_connection.sync();

module.exports = {
  connection: db_connection,
  User: User,
  Routine: Routine,
  Task: Task,
  History: History
}
