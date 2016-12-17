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
      currentRoutine: {},
      task: ''
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
      // if (err) console.log(err);
      this.setState({
        routines: data
      });
    });
  }

  findTasksForRoutine(routine) {
    return routine.tasks;
  }

  findCurrentRoutine() {
    return this.state.routines.filter((routine) => {
      if (this.props.params.id === routine._id) {
        this.state.currentRoutine = routine;
        return routine;
      }
    });
  }

  handleChange(fieldName, event) {
    this.setState({
      [fieldName] : event.target.value
    });
  }

  handleTaskChange(e){
    e.preventDefault();
    this.state.currentRoutine.tasks.push(this.state.task);
    this.forceUpdate();
  }

  removeTask(task, e) {
    e.preventDefault();
    this.state.currentRoutine.tasks.splice((this.state.currentRoutine.tasks).indexOf(task), 1);
    this.forceUpdate();
  }

  handleTaskEdit(oldTask, event) {
    this.state.currentRoutine.tasks[this.state.currentRoutine.tasks.indexOf(oldTask)] = event.task;
  }

  handleNameEdit(event) {
    this.state.currentRoutine.name = event.newName;
  }

  handleSubmit() {
    //****************
    // hard coded user, replace when auth is done.
    //****************
    var userId = 1;
    console.log('submitting routine! state is:', this.state);

    $.ajax({
      method: 'PUT',
      url: '/routines',
      data: JSON.stringify(this.state.currentRoutine),
      dataType: "json",
      contentType: "application/json",
      success: function(res, err){
        console.log('Put Res:', res, 'err', err);
      //   if (err) {
      //     console.log(err, res);
      //   }
      //   console.log('Routine updated successfully, res:', res);
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
                    <Toolbar >
                      <ToolbarGroup firstChild={true}>
                        <InlineEdit text={routine.name} paramName="newName" change={this.handleNameEdit.bind(this)}></InlineEdit>
                      </ToolbarGroup>
                    </Toolbar>
                  {routine.tasks.map((task) => {
                      return (
                        <div key={routine.tasks.indexOf(task)}>
                          <Divider />
                          <InlineEdit text={task} change={this.handleTaskEdit.bind(this, task)}></InlineEdit>
                          <IconButton onClick={this.removeTask.bind(this, task)}
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
                  onClick={this.handleSubmit.bind(this)}
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
