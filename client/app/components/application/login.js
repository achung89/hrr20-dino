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
import MyRoutinesNav from '../routine/my-routines-nav.react.js';
import AppBar from 'material-ui/AppBar';

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
      },
      error:function() {
          alert('Username or Password ');
          browserHistory.push('/login');
        }
    })
  }


  render() {
    const paperStyle = {
      float: 'center',
      height: 350,
      width: 380,
      margin: 30,
      overflow: 'auto',
      align: 'center'
    };
    const center = {
      align: "center",
    };
    const marginLeft = {
      marginLeft:'35%'
    }
    const textAlign = {
      textAlign:'center'
    }
    const app = {
      paddingRight:'32%',
      fontSize: '3em',
      paddingTop:'3%'
    }
    const form = {
      margin: '1em',
      textAlign:'center'
    }
    const input = {
      margin:'1em'
    }
    const logoStyle = {
      fontWeight: 'bold',
      fontSize: 30,
      color: '#FFFFFF',
      paddingLeft:'45%'
    };
    return (
      <div>
        <PreAuthNav />
        <div style={marginLeft}>

        <Paper style={paperStyle} zDepth={4}>
        <AppBar style={app} titleStyle={logoStyle} showMenuIconButton={false} title='DinoTask'/>
          {/* insert onTapTouch for FlatButton */}
          <form style={form} onSubmit={this.submitForm.bind(this)}>
            <TextField style={center} style={input} type='text' value={this.state.username} onChange={(e)=>{this.setState({username: e.target.value});}} hintText='Username'/>
            <TextField style={center} style={input} type= 'password' value={this.state.password} onChange={(e)=>{this.setState({password: e.target.value});}} hintText='Password'/>

            <RaisedButton primary={true} style={textAlign} style={input} type='submit'label='Log In' />

          </form>
        </Paper>
      </div>
      </div>
    );
  }
}