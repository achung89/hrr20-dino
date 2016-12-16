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

export default class Routine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routines: [],
    };

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
      return this.props.params.id === routine.name;
    });
  }

  handleSubmit() {
    //****************
    // hard coded user, replace when auth is done.
    //****************
    var userId = 1;
    console.log('submitting routine! state is:', this.state);

    $.ajax({
      method: 'POST',
      url: "/routines",
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
        console.log('data posted, res:', res, 'err', err);
      }
    });
    // RoutineActions.add({
    //   name: this.state.name || '',
    //   description: this.state.description || '',
    //   repeat: this.state.days
    // });
  }

  addTask(task) {
    console.log('did we add it?');
  }

  removeTask(task) {
    console.log('is it gone yet?');
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
                          <IconButton onClick={this.removeTask}
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
                floatingLabelText="Add another task"
                onChange={this.handleChange.bind(this, 'task')}
              />
            <IconButton tooltip="Add Task" onClick={this.handleTaskChange}><AddCircle /></IconButton>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
