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
import LogIn from "./login";
import SignUp from "./signup";
import { Link, Router, Route, browserHistory } from 'react-router';
// import data from '../../utils/api-utils';

// Flux
// import UserActions from '../../flux/actions/user-actions';
// import UserStore from '../../flux/stores/user-store';
// import RoutineStore from '../../flux/stores/routine-store';
// import TaskStore from '../../flux/stores/task-store';

// material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as themes from '../theme/theme';

// UserStore.useMockData();
// RoutineStore.getData();
// TaskStore.useMockData();

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    //
    // this.state = {
    //   users: [],
    //   currentUser: null,
    //
    //   routines: [],
    //   tasks: []
    // };

    this.checkAuthenticate = (nextState)=>{

      $.ajax({
        type:'GET',
        url:'/checkAuth',
        success:function() {
          browserHistory.push(nextState.location.pathname);
          console.log("DONE!");
        },
        error:function(error) {
          browserHistory.push('/login');
          console.log('lololol', error);
        }
      });
    }
    // this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }



  render() {
    return (
      <div id='application'>
        <MuiThemeProvider muiTheme={getMuiTheme(themes.theme)} >
          <Router history={browserHistory}>
            <Route path='/'  component={MyRoutines}>
            </Route>
            <Route  path='/create-task' 
                   component={CreateTask} onEnter = {this.checkAuthenticate.bind(this)}> 
            </Route>
            <Route path='/routines/:id'
                   component={Routine}
                   test={[1, 2, 3]}
                   onEnter = {this.checkAuthenticate.bind(this)}/>
            <Route  path='/create-routine'
                    component={CreateRoutine}
                    onEnter = {this.checkAuthenticate.bind(this)}>
            </Route>
            <Route  path='/create-task'
                    component={CreateTask}
                    onEnter = {this.checkAuthenticate.bind(this)}>
            </Route>
            <Route path='/tasks/:id'
                   component={Task}
                   onEnter = {this.checkAuthenticate.bind(this)}/>
            <Route path='/login' component= {LogIn}/>
            <Route path='/signup' component={SignUp}/>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}
