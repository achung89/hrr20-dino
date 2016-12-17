import React from 'react';
import RoutineNav from './routine-nav.react.js';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Launch from 'material-ui/svg-icons/action/launch';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';

import RoutineStore from '../../flux/stores/routine-store';
import TaskStore from '../../flux/stores/task-store';
import MyRoutines from './my-routines.react.js';
import InlineEdit from 'react-edit-inline';

import data from '../../utils/api-utils';
import Delete from 'material-ui/svg-icons/action/delete';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export default class Routine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routines: [],
      currentRoutine: {
        name: null,
        description: null,
        days: {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false
        },
        tasks: [],
        task: ''
      }
    };

    this.handleTaskChange = this.handleTaskChange.bind(this);
  }

  componentDidMount() {
    this.getRoutineData();
    // this.getTaskData();
    //
    // RoutineStore.addChangeListener(this.getRoutineData.bind(this));
    // TaskStore.addChangeListener(this.getTaskData.bind(this));
  }

  getRoutineData() {
    data.getRoutines((err, data) => {
      if (err) console.log(err);
      console.log('getRoutineData in routine view:', data);
      this.setState({
        routines: data
      });
    });
  }

  findTasksForRoutine(routine) {
    return routine.tasks;
    // return this.state.tasks.filter((task) => {
    //   return task.routineId === routine._id;
    // });
  }

  findCurrentRoutine() {
    return this.state.routines.filter((routine) => {
      if (this.props.params.id === routine.name) {
        this.state.currentRoutine = routine;
        return routine;
      }
    });
  }

  handleChange(fieldName, event) {
    this.setState({
      currentRoutine: Object.assign({},
      this.state.currentRoutine,
      {[fieldName] : event.target.value})
    });
  }

  handleTaskChange(e){
    console.log('handling task change');
    console.log(this.state.currentRoutine.tasks);
    e.preventDefault();
    this.state.currentRoutine.tasks.push('Test');
    this.forceUpdate();
  }

  removeTask(e) {
    e.preventDefault();
    this.state.currentRoutine.tasks.splice((this.state.currentRoutine.tasks).indexOf(this.state.currentRoutine.task), 1);
    this.forceUpdate();
  }

  handleToggle(day) {
    this.setState({
      days: Object.assign({},
      this.state.days,
      { [day] : !this.state.days[day] })
    });
  }

  handleSubmit() {
    //****************
    // hard coded user, replace when auth is done.
    //****************
    var userId = 1;
    console.log('submitting routine! state is:', this.state);

    $.ajax({
      method: 'PUT',
      url: '/routines/:userId/:routineId',
      data: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        repeat: this.state.days,
        _creator: userId,
        tasks: this.state.tasks
      }),
      dataType: "json",
      contentType: "application/json",
      success: function(res, err){
        console.log('Data updated, res:', res, 'err', err);
      }
    });
    // RoutineActions.add({
    //   name: this.state.name || '',
    //   description: this.state.description || '',
    //   repeat: this.state.days
    // });
  }


  render() {
    const paperStyle = {
      height: 600,
      width: 600,
      margin: 20,
      overflow: 'auto'
    };
    const centerPaper = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const launchTask = (
      <IconButton>
        <Launch />
      </IconButton>
    );

    return (
      <div>
        <RoutineNav />
        <div style={centerPaper}>
          <div>
            <Paper style={paperStyle} zDepth={4}>
              {this.findCurrentRoutine().map((routine) => {
                return (
                  <List>
                    {/* for each task in routine */}
                    {/* add specific task name within primaryText */}
                    <Toolbar >
                      <ToolbarGroup firstChild={true}>
                        <InlineEdit text={routine.name}></InlineEdit>
                      </ToolbarGroup>
                    </Toolbar>
                  {routine.tasks.map((task) => {
                      return (
                        <div key={routine.tasks.indexOf(task)}>
                          <Divider />
                          <InlineEdit text={task}></InlineEdit>
                          <IconButton onClick={this.removeTask.bind(this)}
                                      tooltip="Remove Task">
                            <Delete />
                          </IconButton>
                        </div>
                      );
                    })}
                  </List>
                );
              })}
              <TextField
                type="text"
                hintText="ex. 5 sun salutes"
                onChange={this.handleChange.bind(this, 'task')}
              />
            <IconButton tooltip="Add Task" onClick={this.handleTaskChange.bind(this)}><AddCircle /></IconButton>
              <Link to='/'>
                <RaisedButton
                  label="Update Routine"
                  labelPosition="before"
                  primary={true}
                  icon={<Refresh />}
                  Link to='/'
                />
              </Link>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
