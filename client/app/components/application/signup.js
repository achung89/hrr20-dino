import React from 'react';
// import TestComponent from './test-component.react';
import PreAuthNav from '../routine/pre-auth-nav.react';
import Routine from '../routine/routine.react';
import CreateRoutine from '../routine/create-routine.react';
import MyRoutines from '../routine/my-routines.react';
import Task from '../task/task.react';
import CreateTask from '../task/create-task.react';
import Home from '../home/home.react';
import SideMenu from '../side-menu/side-menu.react';
import { Link, Router, Route, browserHistory } from 'react-router';

import Paper from 'material-ui/Paper';
// flux
// import RoutineStore from '../../flux/stores/routine-store';
// import TaskStore from '../../flux/stores/task-store';
// import RoutineActions from '../../flux/actions/routine-actions';

//
// RoutineStore.useMockData();
// TaskStore.useMockData();

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:''
    };
    this.submitForm.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    // RoutineStore.removeChangeListener(this.getRoutineData);
    // TaskStore.removeChangeListener(this.getTaskData);
  }
  submitForm(e) {
    e.preventDefault();
    console.log(this.state);
    $.ajax({
      type:'POST',
      url:'/signup',
      data: this.state,
      success:function() {
          browserHistory.push('/');
          console.log("DONE!");
      },
      error:function() {
          browserHistory.push('/login');
          console.log('lololol');
        }
    })
  }

  handleChange(event) {


  }

  render() {
    const paperStyle = {
      float: 'center',
      height: 400,
      width: 300,
      margin: 30,
      overflow: 'auto'
    };

    return (
      <div>
        <Paper style={paperStyle} zDepth={4}>
          {/* insert onTapTouch for FlatButton */}
          <h1>Sign Up</h1>
          <form onSubmit={this.submitForm.bind(this)}>
            <input type='text' value={this.state.username} onChange={(e)=>{this.setState({username: e.target.value});}} placeholder='username'/>
            <input type='text' value={this.state.password} onChange={(e)=>{this.setState({password: e.target.value});}} placeholder='password'/>
            <input type='submit' />
          </form>
        </Paper>
      </div>
    );
  }
}