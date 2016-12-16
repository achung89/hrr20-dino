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
import Theme from '../theme/theme.js';

// UserStore.useMockData();
// RoutineStore.getData();
// TaskStore.useMockData();

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      currentUser: null,

      routines: [],
      tasks: []
    };

    this.checkAuthenticate = (nextState)=>{

      $.ajax({
        type:'GET',
        url:'/checkAuth',
        success:function() {
          browserHistory.push(nextState.location.pathname);
          console.log("DONE!");
        },
        error:function() {
          browserHistory.push('/login');
          console.log('lololol');
        }
      });
    }
    // this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    // this.getUserData();
    // this.getRoutineData();
    // this.getTaskData();
    console.log('App component mounted, about to call get')
    data.getRoutine((err, data)=>{
      if (err) console.log('getRoutine error:', err);
      console.log('get routine data:',data);
    });

    UserActions.setCurrentUser({
      name: 'Sir Testburg',
      password:'test',
      id: 1,
      avatar: 'http://www.yesnet.yk.ca/schools/projects/middleages2000/knights/graphics/horse.gif'
    });


    // UserStore.addChangeListener(this.getUserData.bind(this));
    // RoutineStore.addChangeListener(this.getRoutineData.bind(this));
    // TaskStore.addChangeListener(this.getTaskData.bind(this));
  }

  componentWillUnmount() {
    // UserStore.removeChangeListener(this.getUserData);
    // RoutineStore.removeChangeListener(this.getRoutineData);
    // TaskStore.removeChangeListener(this.getTaskData);
  }

  // getUserData() {
  //   UserStore
  //     .get()
  //     .then((data) => {
  //       console.log('User Data is:',data);
  //       this.setState({
  //         users: data.collection,
  //         currentUser: data.currentUser
  //       });
  //     });
  //     this.forceUpdate();
  // }
  //
  // getRoutineData() {
  //   RoutineStore
  //     .get()
  //     .then((data) => {
  //       console.log('Routine Data is:',data);
  //       this.setState({
  //         routines: data.collection
  //       });
  //     });
  // }
  //
  // getTaskData() {
  //   TaskStore
  //     .get()
  //     .then((data) => {
  //       console.log('Task Data is:',data);
  //       this.setState({
  //         tasks: data.collection
  //       });
  //     });
  // }


  render() {
    return (
      <div id='application'>
        <MuiThemeProvider muiTheme={getMuiTheme(Theme)} >
          <Router history={browserHistory}>
            <Route path='/'  component={MyRoutines}
                             routines={this.state.routines}
                             tasks={this.state.tasks}
                             onEnter = {this.checkAuthenticate.bind(this)}>
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
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}
