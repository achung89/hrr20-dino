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
import TextField from 'material-ui/TextField';
import { Link, Router, Route, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

// flux
// import RoutineStore from '../../flux/stores/routine-store';
// import TaskStore from '../../flux/stores/task-store';
// import RoutineActions from '../../flux/actions/routine-actions';

//
// RoutineStore.useMockData();
// TaskStore.useMockData();

export default class LogIn extends React.Component {
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
      type:'GET',
      url:'/login',
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


  render() {
    const paperStyle = {
      float: 'center',
      height: 300,
      width: 300,
      margin: 30,
      overflow: 'auto',
      align: 'center'
    };
    const center = {
      textAlign: "center"
    }
    return (
      <div>
      <PreAuthNav />
      <div style={center}>
        <Paper style={center} style={paperStyle} zDepth={4}>
          {/* insert onTapTouch for FlatButton */}
          <h1 style={center}>Log In</h1>
          <form style={center} onSubmit={this.submitForm.bind(this)}>
            <TextField style={center} type='text' value={this.state.username} onChange={(e)=>{this.setState({username: e.target.value});}} placeholder='username'/>
            <TextField style={center} type='text' value={this.state.password} onChange={(e)=>{this.setState({password: e.target.value});}} placeholder='password'/>
            <RaisedButton style={center} type='submit'>Log in</RaisedButton>

          </form>
          <div style={center}><Link to='/signup'><u>Not a user? Click here to sign up</u></Link></div>
        </Paper>
      </div>
      </div>
    );
  }
}